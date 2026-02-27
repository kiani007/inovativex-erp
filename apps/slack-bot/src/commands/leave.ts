import type { SlackCommandContext } from "../types";

export async function registerLeaveCommands(
  context: SlackCommandContext,
  action: string
) {
  switch (action) {
    case "apply":
      return await handleLeaveApply(context);
    case "balance":
      return await handleLeaveBalance(context);
    case "team":
      return await handleLeaveTeam(context);
    case "payslip":
      return await handlePayslip(context);
    default:
      return await handleLeaveBalance(context);
  }
}

async function handleLeaveApply(context: SlackCommandContext) {
  // Open a modal for leave application
  await context.client.views.open({
    trigger_id: (context.body as { trigger_id: string }).trigger_id,
    view: {
      type: "modal",
      callback_id: "leave_apply_modal",
      title: { type: "plain_text", text: "Apply for Leave" },
      submit: { type: "plain_text", text: "Submit" },
      close: { type: "plain_text", text: "Cancel" },
      blocks: [
        {
          type: "input",
          block_id: "leave_type",
          label: { type: "plain_text", text: "Leave Type" },
          element: {
            type: "static_select",
            action_id: "leave_type_select",
            options: [
              { text: { type: "plain_text", text: "Annual Leave" }, value: "annual" },
              { text: { type: "plain_text", text: "Sick Leave" }, value: "sick" },
              { text: { type: "plain_text", text: "Casual Leave" }, value: "casual" },
              { text: { type: "plain_text", text: "Work From Home" }, value: "wfh" },
              { text: { type: "plain_text", text: "Unpaid Leave" }, value: "unpaid" },
            ],
          },
        },
        {
          type: "input",
          block_id: "start_date",
          label: { type: "plain_text", text: "Start Date" },
          element: {
            type: "datepicker",
            action_id: "start_date_pick",
          },
        },
        {
          type: "input",
          block_id: "end_date",
          label: { type: "plain_text", text: "End Date" },
          element: {
            type: "datepicker",
            action_id: "end_date_pick",
          },
        },
        {
          type: "input",
          block_id: "reason",
          label: { type: "plain_text", text: "Reason" },
          element: {
            type: "plain_text_input",
            action_id: "reason_input",
            multiline: true,
            placeholder: { type: "plain_text", text: "Please provide a reason for your leave request" },
          },
        },
      ],
    },
  });
}

async function handleLeaveBalance(context: SlackCommandContext) {
  // In production, fetch from Supabase
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Your Leave Balance (2026)" },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Annual Leave*\n12 / 20 remaining" },
          { type: "mrkdwn", text: "*Sick Leave*\n8 / 10 remaining" },
          { type: "mrkdwn", text: "*Casual Leave*\n3 / 5 remaining" },
          { type: "mrkdwn", text: "*Work From Home*\n18 / 24 remaining" },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Apply for Leave" },
            style: "primary",
            action_id: "leave_apply_btn",
          },
          {
            type: "button",
            text: { type: "plain_text", text: "View History" },
            action_id: "leave_history_btn",
          },
        ],
      },
    ],
  });
}

async function handleLeaveTeam(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Who's Out Today" },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            "- Alex Thompson — Annual Leave (Feb 27 - Mar 2)",
            "- Lisa Wang — WFH",
            "- Carlos Martinez — Sick Leave",
          ].join("\n"),
        },
      },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Upcoming (Next 7 days):*\n- Nina Patel — Annual Leave (Mar 3 - Mar 7)\n- Tom Harris — WFH (Mar 3)",
        },
      },
    ],
  });
}

async function handlePayslip(context: SlackCommandContext) {
  const month = context.args[0] || "February 2026";
  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Your payslip for *${month}* is ready.\n\n<https://erp.inovativex.com/hr/payroll|Download Payslip>`,
        },
      },
    ],
  });
}
