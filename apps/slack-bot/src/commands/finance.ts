import type { SlackCommandContext } from "../types";

export async function registerFinanceCommands(
  context: SlackCommandContext,
  action: string
) {
  switch (action) {
    case "list":
    case "invoice":
      return await handleInvoiceList(context);
    case "create":
      return await handleInvoiceCreate(context);
    case "expense":
      return await handleExpenseSubmit(context);
    case "budget":
      return await handleBudget(context);
    case "client":
      return await handleClient(context);
    case "deal":
      return await handleDeal(context);
    case "pipeline":
      return await handlePipeline(context);
    default:
      return await handleInvoiceList(context);
  }
}

async function handleInvoiceList(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Recent Invoices" },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            "| Invoice | Client | Amount | Status |",
            "|---------|--------|--------|--------|",
            "| INV-042 | Acme Corp | $15,000 | Paid |",
            "| INV-041 | FinTech Solutions | $28,500 | Sent |",
            "| INV-040 | DataViz Inc | $12,000 | Overdue |",
            "| INV-039 | RetailMax | $35,000 | Paid |",
          ].join("\n"),
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Outstanding:* $42,800" },
          { type: "mrkdwn", text: "*Overdue:* $12,000" },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "Create Invoice" },
            style: "primary",
            action_id: "create_invoice_btn",
          },
          {
            type: "button",
            text: { type: "plain_text", text: "View All" },
            url: "https://erp.inovativex.com/finance/invoices",
          },
        ],
      },
    ],
  });
}

async function handleInvoiceCreate(context: SlackCommandContext) {
  await context.respond({
    text: "To create an invoice, visit: https://erp.inovativex.com/finance/invoices?action=new",
  });
}

async function handleExpenseSubmit(context: SlackCommandContext) {
  await context.client.views.open({
    trigger_id: (context.body as { trigger_id: string }).trigger_id,
    view: {
      type: "modal",
      callback_id: "expense_submit_modal",
      title: { type: "plain_text", text: "Submit Expense" },
      submit: { type: "plain_text", text: "Submit" },
      close: { type: "plain_text", text: "Cancel" },
      blocks: [
        {
          type: "input",
          block_id: "category",
          label: { type: "plain_text", text: "Category" },
          element: {
            type: "static_select",
            action_id: "category_select",
            options: [
              { text: { type: "plain_text", text: "Travel" }, value: "travel" },
              { text: { type: "plain_text", text: "Meals" }, value: "meals" },
              { text: { type: "plain_text", text: "Software" }, value: "software" },
              { text: { type: "plain_text", text: "Hardware" }, value: "hardware" },
              { text: { type: "plain_text", text: "Office Supplies" }, value: "office" },
              { text: { type: "plain_text", text: "Training" }, value: "training" },
              { text: { type: "plain_text", text: "Other" }, value: "other" },
            ],
          },
        },
        {
          type: "input",
          block_id: "amount",
          label: { type: "plain_text", text: "Amount ($)" },
          element: {
            type: "plain_text_input",
            action_id: "amount_input",
            placeholder: { type: "plain_text", text: "e.g., 150.00" },
          },
        },
        {
          type: "input",
          block_id: "description",
          label: { type: "plain_text", text: "Description" },
          element: {
            type: "plain_text_input",
            action_id: "description_input",
            multiline: true,
          },
        },
        {
          type: "input",
          block_id: "date",
          label: { type: "plain_text", text: "Date" },
          element: {
            type: "datepicker",
            action_id: "date_pick",
          },
        },
      ],
    },
  });
}

async function handleBudget(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Budget Overview" },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: [
            "*Client Portal v2:* $45,000 / $60,000 (75%)",
            "*Mobile Banking App:* $92,000 / $120,000 (77%)",
            "*AI Dashboard:* $28,000 / $30,000 (93%) :warning:",
            "*Engineering Dept Q1:* $180,000 / $200,000 (90%) :warning:",
          ].join("\n"),
        },
      },
    ],
  });
}

async function handleClient(context: SlackCommandContext) {
  const clientName = context.args.join(" ") || "Overview";
  await context.respond({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Client: ${clientName}*\n\n<https://erp.inovativex.com/clients|View All Clients>`,
        },
      },
    ],
  });
}

async function handleDeal(context: SlackCommandContext) {
  await context.respond({
    text: "View your deal pipeline: https://erp.inovativex.com/pipeline",
  });
}

async function handlePipeline(context: SlackCommandContext) {
  await context.respond({
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Deal Pipeline" },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: "*Leads:* 5 ($120K)" },
          { type: "mrkdwn", text: "*Proposals:* 3 ($210K)" },
          { type: "mrkdwn", text: "*Negotiation:* 2 ($180K)" },
          { type: "mrkdwn", text: "*Won (This Q):* 4 ($340K)" },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: { type: "plain_text", text: "View Pipeline" },
            url: "https://erp.inovativex.com/pipeline",
          },
        ],
      },
    ],
  });
}
