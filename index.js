#!/usr/bin/env node
'use strict'

const { symbol: BLOCK_SYMBOL } = process.env
const _reverse = require('lodash/reverse')
const sparkline = require('sparkline')
const { RESTv2 } = require('bfx-api-node-rest')
const { preparePrice } = require('bfx-api-node-util')

const CCY_ICONS = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  BTC: '\uf15a',
  ETH: '\ufcb9'
}

const rest = new RESTv2({ transform: true })

const run = async () => {
  const symbol = BLOCK_SYMBOL[0] === 't' ? BLOCK_SYMBOL : `t${BLOCK_SYMBOL}`
  const base = symbol.substring(1, 4)
  const quote = symbol.substring(4)
  const candles = await rest.candles({
    symbol,
    timeframe: '1m',
    section: 'hist'
  })

  console.log(sparkline(_reverse(candles.map(c => c.close).slice(0, 32))))
}

try {
  run()
} catch (e) {
  console.error(e.message)
}
