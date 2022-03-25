#include "nested_plugin.h"
#include "text.h"

static void set_sent_token_ui(ethQueryContractUI_t *msg, context_t *context)
{
    switch (context->selectorIndex)
    {
    case CREATE:
        if (context->booleans & IS_COPY)
            strlcpy(msg->title, TITLE_COPY_SENT_TOKEN, msg->titleLength);
        else
            strlcpy(msg->title, TITLE_CREATE_SENT_TOKEN, msg->titleLength);
        amountToString(context->payment_token_amount, sizeof(context->payment_token_amount),
                       context->payment_token_decimals,
                       context->ticker,
                       msg->msg,
                       msg->msgLength);
        break;
    case DESTROY:
        strlcpy(msg->title, TITLE_DESTROY_SENT_TOKEN, msg->titleLength);
        strlcpy(msg->msg, MSG_DESTROY_SENT_TOKEN, msg->msgLength);
        break;
    default:
        break;
    }
}

static void set_received_token_ui(ethQueryContractUI_t *msg, context_t *context)
{
    switch (context->selectorIndex)
    {
    case CREATE:
        if (context->booleans)
        {
            strlcpy(msg->title, TITLE_COPY_RECEIVED_TOKEN, msg->titleLength);
            strlcpy(msg->msg, MSG_COPY_RECEIVED_TOKEN, msg->msgLength);
        }
        else
        {
            strlcpy(msg->title, TITLE_CREATE_RECEIVED_TOKEN, msg->titleLength);
            strlcpy(msg->msg, MSG_CREATE_RECEIVED_TOKEN, msg->msgLength);
        }
        break;
    case DESTROY:
        strlcpy(msg->title, TITLE_DESTROY_SENT_TOKEN, msg->titleLength);
        strlcpy(msg->msg, MSG_DESTROY_SENT_TOKEN, msg->msgLength);
        break;
    default:
        break;
    }
}

//// Set UI for "Warning" screen.
//static void set_token_warning_ui(ethQueryContractUI_t *msg,
//                                 context_t *context __attribute__((unused)))
//{
//    strlcpy(msg->title, TITLE_UNKNOWN_PAYMENT_TOKEN, msg->titleLength);
//    strlcpy(msg->msg, MSG_UNKNOWN_PAYMENT_TOKEN, msg->titleLength);
//}

static void skip_right(context_t *context)
{
    while (!(context->screen_array & context->plugin_screen_index << 1))
        context->plugin_screen_index <<= 1;
    context->plugin_screen_index <<= 1;
}

static void skip_left(context_t *context)
{
    while (!(context->screen_array & context->plugin_screen_index >> 1))
        context->plugin_screen_index >>= 1;
    context->plugin_screen_index >>= 1;
}

static bool get_scroll_direction(uint8_t screen_index, uint8_t previous_screen_index)
{
    if (screen_index > previous_screen_index || screen_index == 0)
        return RIGHT_SCROLL;
    else
        return LEFT_SCROLL;
}

static void get_screen_array(ethQueryContractUI_t *msg, context_t *context)
{
    if (msg->screenIndex == 0)
    {
        context->plugin_screen_index = SENT_TOKEN_UI;
        context->previous_screen_index = 0;
        return;
    }
    // This should only happen on last valid Screen
    if (msg->screenIndex == context->previous_screen_index)
    {
        context->plugin_screen_index = LAST_UI;
        // if LAST_UI is up, stop on it.
        if (context->screen_array & LAST_UI)
            return;
    }
    bool scroll_direction = get_scroll_direction(msg->screenIndex, context->previous_screen_index);
    // Save previous_screen_index after all checks are done.
    context->previous_screen_index = msg->screenIndex;
    // Scroll to next screen
    if (scroll_direction == RIGHT_SCROLL)
        skip_right(context);
    else
        skip_left(context);
}

void handle_query_contract_ui(void *parameters)
{
    ethQueryContractUI_t *msg = (ethQueryContractUI_t *)parameters;
    context_t *context = (context_t *)msg->pluginContext;

    // Clean the display fields.
    memset(msg->title, 0, msg->titleLength);
    memset(msg->msg, 0, msg->msgLength);

    get_screen_array(msg, context);

    msg->result = ETH_PLUGIN_RESULT_OK;
    switch (context->plugin_screen_index)
    {
    case SENT_TOKEN_UI:
        set_sent_token_ui(msg, context);
        break;
    case RECEIVED_TOKEN_UI:
        set_received_token_ui(msg, context);
        break;
    //case UNKNOWN_PAYMENT_TOKEN_UI:
    //    set_token_warning_ui(msg, context);
    //    break;
    default:
        msg->result = ETH_PLUGIN_RESULT_ERROR;
        break;
    }
}
