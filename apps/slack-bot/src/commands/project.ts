import type { SlackCommandContext } from "../types";

export async function registerProjectCommands(
  context: SlackCommandContext,
  action: string
) {
  switch (action) {
    case "list":
      return await handleProjectList(context);
    case "status":
      return await handleProjectStatus(context);
    case "sprint":
      return await handleSprint(context);
    case "timetrack-start":
      return await handleTimeTrackStart(context);
    case "timetrack-stop":
      return await handleTimeTrackStop(context);
    case "timetrack-status":
      return await handleTimeTrackStatus(context);
    default:
      return await handleProjectList(context);
  }
}

async function handleProjectList(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Your Active Projects" },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            "1. *Client Portal v2* — Acme Corp",
            "   Status: Active | Progress: 72% | Due: Mar 15",
            "",
            "2. *Mobile Banking App* — FinTech Solutions",
            "   Status: Active | Progress: 45% | Due: Apr 30",
            "",
            "3. *AI Dashboard* — DataViz Inc",
            "   Status: Active | Progress: 88% | Due: Mar 05",
          ].join("\n"),
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "View All Projects" },
            url: "https://erp.inovativex.com/projects",
          },
        ],
      },
    ],
  });
}

async function handleProjectStatus(context: SlackCommandContext) {
  const projectName = context.args.slice(0, -1).join(" ") || "Client Portal v2";

  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `Project: ${projectName}` },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Status:* Active" },
          { type: "mrkdwn", text: "*Progress:* 72%" },
          { type: "mrkdwn", text: "*Team:* 8 members" },
          { type: "mrkdwn", text: "*Due:* Mar 15, 2026" },
          { type: "mrkdwn", text: "*Budget:* $45K / $60K" },
          { type: "mrkdwn", text: "*Sprint:* Sprint 12" },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Task Summary:*\nBacklog: 5 | To Do: 8 | In Progress: 12 | Review: 3 | Done: 28",
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "View Board" },
            url: "https://erp.inovativex.com/projects/1/board",
          },
        ],
      },
    ],
  });
}

async function handleSprint(context: SlackCommandContext) {
  const subAction = context.args[0] || "current";

  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Sprint 12 — Client Portal v2" },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Goal:* Complete payment integration" },
          { type: "mrkdwn", text: "*Duration:* Feb 17 - Mar 3" },
          { type: "mrkdwn", text: "*Points:* 34 / 42 completed" },
          { type: "mrkdwn", text: "*Days Left:* 4" },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Remaining Tasks:*\n- Payment gateway webhook handler (5 pts)\n- Error handling & retry logic (3 pts)",
        },
      },
    ],
  });
}

async function handleTimeTrackStart(context: SlackCommandContext) {
  const taskName = context.args.slice(1).join(" ") || "current task";
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
          text: `Timer started for *${taskName}* at ${now}`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Stop Timer" },
            style: "danger",
            action_id: "timetrack_stop_btn",
          },
        ],
      },
    ],
  });
}

async function handleTimeTrackStop(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Timer stopped.\n\n*Session Summary:*\n- Task: Payment gateway integration\n- Duration: 2h 15m\n- Project: Client Portal v2",
        },
      },
    ],
  });
}

async function handleTimeTrackStatus(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Time Tracking Status*\n\nNo active timer. Use `/erp timetrack start [task]` to begin.",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Today's Logged Time:*\n- Payment gateway integration: 2h 15m\n- Code review: 45m\n- Total: 3h 00m",
        },
      },
    ],
  });
}
