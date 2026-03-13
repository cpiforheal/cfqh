# 浏览器后台启动说明

## 本地模式
直接启动：

```powershell
npm run admin:web
```

默认访问：

```text
http://127.0.0.1:3200
```

此时读写文件：

```text
database/local-admin-data.json
```

## 云数据库模式
推荐先在项目根目录创建：

```text
cfqh/.env.admin-web
```

可直接参考：

```text
cfqh/.env.admin-web.example
```

然后再启动：

```powershell
npm run admin:web
```

也可以继续在当前终端设置云环境变量后启动：

```powershell
$env:CLOUDBASE_ENV_ID='你的云环境ID'
$env:CLOUDBASE_APIKEY='你的 CloudBase API Key'
npm run admin:web
```

也可以使用腾讯云密钥：

```powershell
$env:CLOUDBASE_ENV_ID='你的云环境ID'
$env:TENCENTCLOUD_SECRETID='你的 SecretId'
$env:TENCENTCLOUD_SECRETKEY='你的 SecretKey'
npm run admin:web
```

启动后访问健康检查：

```text
http://127.0.0.1:3200/api/health
```

返回中 `mode` 为 `cloud`，说明浏览器后台已经直接连接云数据库。

如果返回中 `mode` 仍为 `local`，通常说明：

- 没有配置 `CLOUDBASE_APIKEY`
- 也没有配置 `TENCENTCLOUD_SECRETID` / `TENCENTCLOUD_SECRETKEY`
- 或者当前密钥不可用
