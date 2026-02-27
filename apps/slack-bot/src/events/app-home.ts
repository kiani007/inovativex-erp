import type { App } from "@slack/bolt";

export function registerAppHomeEvent(app: App) {
  app.event("app_home_opened", async ({ event, client }) => {
    await client.views.publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: "Inovativex ERP" },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Welcome to the Inovativex ERP Slack Bot! Manage your work directly from Slack.",
            },
          },
          { type: "divider" },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Quick Actions*",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "Clock In" },
                style: "primary",
                action_id: "home_clock_in",
              },
              {
                type: "button",
                text: { type: "plain_text", text: "Apply Leave" },
                action_id: "home_apply_leave",
              },
              {
                type: "button",
                text: { type: "plain_text", text: "Submit Standup" },
                action_id: "home_submit_standup",
              },
              {
                type: "button",
                text: { type: "plain_text", text: "Submit Expense" },
                action_id: "home_submit_expense",
              },
            ],
          },
          { type: "divider" },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: [
                "*Your Stats Today:*",
                "",
                "Status: Clocked In (09:00 AM)",
                "Active Projects: 3",
                "Pending Approvals: 4",
                "Leave Balance: 12 annual, 8 sick",
                "",
                "Type `/erp help` in any channel for the full command list.",
              ].join("\n"),
            },
          },
          { type: "divider" },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Pending Approvals (4)*",
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "- Ahmed Khan — Leave Request (3 days)\n- Lisa Wang — WFH Request\n- Elena Rodriguez — Expense Claim ($299)\n- David Kim — Asset Request (Monitor)",
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "View All Approvals" },
                action_id: "home_view_approvals",
              },
            ],
          },
          { type: "divider" },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "<https://erp.inovativex.com|Open ERP Dashboard> | <https://erp.inovativex.com/hr/leave|Leave Calendar> | <https://erp.inovativex.com/projects|Projects>",
              },
            ],
          },
        ],
      },
    });
  });
}
