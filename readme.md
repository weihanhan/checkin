# Checkin

forked from [actions-integration/checkin](https://github.com/actions-integration/checkin)

GitHub Actions 实现 [GLaDOS][glados] 自动签到

## 使用说明

1. Fork 这个仓库

2. 登录 [GLaDOS][glados] 获取 Cookie

3. 打开 `项目Settings > Secrets and variables > Actions`，在 `Secrets` 中添加变量（New repository secret ），变量名：`GLADOS`，变量值：`登录 GLaDOS 的 Cookie`

4. 启用 Actions, 每天北京时间 00:10 自动签到

5. 如需推送通知, 可用 [PushPlus][pushplus], 与第 3 步一样添加变量，变量名：`NOTIFY`，变量值：`从 PushPlus 获取的密钥`

[glados]: https://github.com/glados-network/GLaDOS
[pushplus]: https://www.pushplus.plus/
