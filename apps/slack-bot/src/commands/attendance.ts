import type { SlackCommandContext } from "../types";

export async function registerAttendanceCommands(
  context: SlackCommandContext,
  action: string
) {
  switch (action) {
    case "clockin":
      return await handleClockIn(context);
    case "clockout":
      return await handleClockOut(context);
    case "status":
      return await handleAttendanceStatus(context);
    default:
      return await handleAttendanceStatus(context);
  }
}

async function handleClockIn(context: SlackCommandContext) {
  const now = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // In production, create attendance record in Supabase
  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `You've clocked in at *${now}*. Have a productive day!`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Clock Out" },
            style: "danger",
            action_id: "clock_out_btn",
          },
        ],
      },
    ],
  });
}

async function handleClockOut(context: SlackCommandContext) {
  const now = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `You've clocked out at *${now}*.\n\n*Today's Summary:*\n- Clock In: 09:00 AM\n- Clock Out: ${now}\n- Total Hours: 8h 30m\n\nGood work today!`,
        },
      },
    ],
  });
}

async function handleAttendanceStatus(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Today's Attendance" },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Present*\n95 employees" },
          { type: "mrkdwn", text: "*WFH*\n15 employees" },
          { type: "mrkdwn", text: "*On Leave*\n12 employees" },
          { type: "mrkdwn", text: "*Absent*\n5 employees" },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Your status: *Clocked In* since 09:00 AM",
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Clock Out" },
            action_id: "clock_out_btn",
          },
          {
            type: "button",
            text: { type: "plain_text", text: "View Full Report" },
            url: "https://erp.inovativex.com/hr/attendance",
          },
        ],
      },
    ],
  });
}
