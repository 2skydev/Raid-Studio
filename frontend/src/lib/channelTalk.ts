import * as ChannelService from '@channel.io/channel-web-sdk-loader'

export const channelTalk = {
  ...ChannelService,
  init: () => {
    ChannelService.loadScript()
    ChannelService.boot({
      pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string,
    })
  },
}
