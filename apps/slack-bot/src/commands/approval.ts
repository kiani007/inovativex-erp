import type { SlackCommandContext } from "../types";

export async function registerApprovalCommands(
  context: SlackCommandContext,
  action: string
) {
  switch (action) {
    case "list":
      return await handleApprovalList(context);
    case "approve":
      return await handleApprove(context);
    case "reject":
      return await handleReject(context);
    default:
      return await handleApprovalList(context);
  }
}

async function handleApprovalList(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Pending Approvals" },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Leave Requests:*",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "1. *Ahmed Khan* — Annual Leave (Mar 10-12, 3 days)\n   Submitted 2 hours ago",
        },
        accessory: {
          type: "button",
          text: { type: "plain_text", text: "Review" },
          action_id: "review_leave_1",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "2. *Lisa Wang* — WFH (Mar 5, 1 day)\n   Submitted 4 hours ago",
        },
        accessory: {
          type: "button",
          text: { type: "plain_text", text: "Review" },
          action_id: "review_leave_2",
        },
      },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Expense Claims:*",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "3. *Elena Rodriguez* — Software License ($299)\n   JetBrains WebStorm renewal",
        },
        accessory: {
          type: "button",
          text: { type: "plain_text", text: "Review" },
          action_id: "review_expense_1",
        },
      },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Asset Requests:*",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "4. *David Kim* — External Monitor\n   Needs second monitor for design work",
        },
        accessory: {
          type: "button",
          text: { type: "plain_text", text: "Review" },
          action_id: "review_asset_1",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "4 pending approvals | Use `/erp approve [id]` or `/erp reject [id] [reason]`",
          },
        ],
      },
    ],
  });
}

async function handleApprove(context: SlackCommandContext) {
  const id = context.args[0];

  if (!id) {
    return await context.respond({
      text: "Please provide an approval ID. Usage: `/erp approve [id]`",
    });
  }

  // In production, update the record in Supabase and send notifications
  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Request *#${id}* has been approved. The requester has been notified.`,
        },
      },
    ],
  });
}

async function handleReject(context: SlackCommandContext) {
  const id = context.args[0];
  const reason = context.args.slice(1).join(" ");

  if (!id) {
    return await context.respond({
      text: "Please provide an approval ID. Usage: `/erp reject [id] [reason]`",
    });
  }

  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Request *#${id}* has been rejected.${reason ? `\nReason: ${reason}` : ""}\n\nThe requester has been notified.`,
        },
      },
    ],
  });
}
