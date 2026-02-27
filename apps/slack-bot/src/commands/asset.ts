import type { SlackCommandContext } from "../types";

export async function registerAssetCommands(
  context: SlackCommandContext,
  action: string
) {
  switch (action) {
    case "mine":
      return await handleMyAssets(context);
    case "request":
      return await handleAssetRequest(context);
    default:
      return await handleMyAssets(context);
  }
}

async function handleMyAssets(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Your Assigned Assets" },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            "1. *MacBook Pro 16\" M3* (INX-HW-042)",
            "   Assigned: Jan 15, 2023 | Condition: Good",
            "",
            "2. *Dell UltraSharp 27\" Monitor* (INX-HW-089)",
            "   Assigned: Jan 15, 2023 | Condition: Good",
            "",
            "3. *Apple Magic Keyboard* (INX-HW-156)",
            "   Assigned: Jan 15, 2023 | Condition: Good",
            "",
            "*Software Licenses:*",
            "- JetBrains IntelliJ IDEA (Expires: Dec 2026)",
            "- Figma Professional (Expires: Mar 2026)",
          ].join("\n"),
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Request New Asset" },
            style: "primary",
            action_id: "request_asset_btn",
          },
          {
            type: "button",
            text: { type: "plain_text", text: "Report Issue" },
            action_id: "report_asset_issue_btn",
          },
        ],
      },
    ],
  });
}

async function handleAssetRequest(context: SlackCommandContext) {
  await context.client.views.open({
    trigger_id: (context.body as { trigger_id: string }).trigger_id,
    view: {
      type: "modal",
      callback_id: "asset_request_modal",
      title: { type: "plain_text", text: "Request Asset" },
      submit: { type: "plain_text", text: "Submit Request" },
      close: { type: "plain_text", text: "Cancel" },
      blocks: [
        {
          type: "input",
          block_id: "asset_type",
          label: { type: "plain_text", text: "Asset Type" },
          element: {
            type: "static_select",
            action_id: "type_select",
            options: [
              { text: { type: "plain_text", text: "Laptop" }, value: "laptop" },
              { text: { type: "plain_text", text: "Monitor" }, value: "monitor" },
              { text: { type: "plain_text", text: "Keyboard" }, value: "keyboard" },
              { text: { type: "plain_text", text: "Mouse" }, value: "mouse" },
              { text: { type: "plain_text", text: "Headset" }, value: "headset" },
              { text: { type: "plain_text", text: "Software License" }, value: "software" },
              { text: { type: "plain_text", text: "Other" }, value: "other" },
            ],
          },
        },
        {
          type: "input",
          block_id: "description",
          label: { type: "plain_text", text: "Description" },
          element: {
            type: "plain_text_input",
            action_id: "desc_input",
            multiline: true,
            placeholder: {
              type: "plain_text",
              text: "Describe what you need and why...",
            },
          },
        },
        {
          type: "input",
          block_id: "urgency",
          label: { type: "plain_text", text: "Urgency" },
          element: {
            type: "static_select",
            action_id: "urgency_select",
            options: [
              { text: { type: "plain_text", text: "Low — Nice to have" }, value: "low" },
              { text: { type: "plain_text", text: "Medium — Needed soon" }, value: "medium" },
              { text: { type: "plain_text", text: "High — Blocking my work" }, value: "high" },
            ],
          },
        },
      ],
    },
  });
}
