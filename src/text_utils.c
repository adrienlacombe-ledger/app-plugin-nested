#include "text.h"

void msg_display_address_ui(ethQueryContractUI_t *msg, uint8_t *address)
{
    msg->msg[0] = '0';
    msg->msg[1] = 'x';
    getEthAddressStringFromBinary((uint8_t *)address,
                                  (char *)msg->msg + 2,
                                  msg->pluginSharedRW->sha3,
                                  0);
}

void msg_ticker_or_address(ethQueryContractUI_t *msg, context_t *context, int token) // token argument is 1 for token1 and 2 for token2
{
    if (token == 1) // Token1
    {
        if (context->booleans & TOKEN1_FOUND)
            snprintf(msg->msg, msg->msgLength, "%s", context->token1_ticker);
        else
            msg_display_address_ui(msg, context->token1_address);
    }
    else if (token == 2) // Token2
    {
        if (context->booleans & TOKEN2_FOUND)
            snprintf(msg->msg, msg->msgLength, "%s", context->token2_ticker);
        else
            msg_display_address_ui(msg, context->token2_address);
    }
}

void msg_2tickers_ui(ethQueryContractUI_t *msg, context_t *context)
{
    snprintf(msg->msg, msg->msgLength, "%s and %s", context->token1_ticker, context->token2_ticker);
}

void msg_number_of_tokens(ethQueryContractUI_t *msg, context_t *context, int token)
{
    if (context->number_of_tokens == 1)
    {
        if (!(context->booleans & TOKEN1_FOUND) || !(context->booleans & TOKEN2_FOUND))
            snprintf(msg->msg, msg->msgLength, "%d token", context->number_of_tokens);
        else if (token == 1 && context->booleans & TOKEN1_FOUND)
            snprintf(msg->msg, msg->msgLength, "%s", context->token1_ticker);
        else if (token == 2 && context->booleans & TOKEN2_FOUND)
            snprintf(msg->msg, msg->msgLength, "%s", context->token2_ticker);
        else
            snprintf(msg->msg, msg->msgLength, "ERROR", context->token2_ticker);
    }
    else
        snprintf(msg->msg, msg->msgLength, "%d tokens", context->number_of_tokens);
}

void msg_amount_or_address_ui(ethQueryContractUI_t *msg, context_t *context)
{
    if (context->booleans & TOKEN1_FOUND)
    {
        amountToString(context->token1_amount, sizeof(context->token1_amount),
                       context->token1_decimals,
                       context->token1_ticker,
                       msg->msg,
                       msg->msgLength);
    }
    else
        msg_display_address_ui(msg, context->token1_address);
}