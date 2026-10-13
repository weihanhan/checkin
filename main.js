const glados = async () => {
  const cookie = process.env.GLADOS
  if (!cookie) return

  //const domain = 'glados.rocks'
  const domain = 'glados.cloud'
  try {
    const headers = {
      'cookie': cookie,
      'referer': `https://${domain}/console/checkin`,
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    }
    const checkin = await fetch(`https://${domain}/api/user/checkin`, {
      method: 'POST',
      headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ token: domain }),
    }).then((r) => r.json())

    // 签到接口判断：code 小于 0 视为失败（如 -2 表示无权限/Cookie 失效）
    if (checkin.code === undefined || checkin.code < 0) {
      return [
        '签到失败',
        `状态码: ${checkin.code}`,
        `提示信息: ${checkin.message}`,
        `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
      ]
    }

    // 签到成功后获取账户状态
    const status = await fetch(`https://${domain}/api/user/status`, {
      method: 'GET',
      headers,
    }).then((r) => r.json())

    // 安全解析剩余天数（防御性取整）
    const leftDays = status?.data?.leftDays !== undefined
      ? Math.floor(Number(status.data.leftDays))
      : '未知'

    return [
      '签到成功',
      `状态码: ${checkin.code}`,
      `提示信息: ${checkin.message}`,
      `剩余 ${leftDays} 天`,
    ]
  } catch (error) {
    return [
      '签到异常',
      `${error}`,
      `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
    ]
  }
}

const notify = async (contents) => {
  const token = process.env.NOTIFY
  if (token && contents) {
    try {
      return await fetch(`https://www.pushplus.plus/send`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          token,
          title: contents[0],
          content: contents.join('<br>'),
          template: 'markdown',
        }),
      })
    } catch (e) {
      console.error('调用 pushplus 通知失败')
    }
  }
}

const main = async () => {
  await notify(await glados())
}

main()
