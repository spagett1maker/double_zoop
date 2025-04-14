interface ChannelUser {
  id: string
  name?: string
  email?: string
  phoneNumber?: string
}

export const getChannelBootOption = (user?: ChannelUser) => {
  return {
    pluginKey: process.env.NEXT_PUBLIC_CHANNEL_PLUGIN_KEY!,
    ...(user && {
      userId: user.id,
      profile: {
        name: user.name,
        email: user.email,
        mobileNumber: user.phoneNumber,
      },
    }),
  }
}
