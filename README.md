# LoverOS

人机恋移动端小手机前端。第一版是**模块化纯前端 SPA**：每个功能拆成独立文件，方便继续修改，也方便以后接 VPS 后端、Supabase、MCP 或原生 App。

## 已可用功能

- 锁屏 / 小手机首页
- 聊天：本地保存消息，支持 OpenAI 兼容接口，失败时本地模拟回复兜底
- 角色卡：编辑后会真实注入聊天 system prompt
- 记忆：Core + 长期记忆条，聊天时会真实注入上下文
- 动态：发布 / 删除 / 本地保存
- 日记：发布 / 删除 / 本地保存
- 素材库：上传图片、浏览器端压缩、设置头像 / 壁纸
- 天气：浏览器定位 + Open-Meteo 真实天气接口
- 设置：主题、用户名、模型配置、备份导入导出
- PWA manifest：可添加到手机主屏幕

## 运行

推荐用本地服务器打开：

```bash
python -m http.server 5173
# http://127.0.0.1:5173
```

也可以：

```bash
npm run dev
```

## 目录

```txt
src/
  main.js
  router.js
  state.js
  ui.js
  pages/       每个页面一个文件
  services/    模型、天气、备份、图片处理
  styles.css
```

## 注意

纯前端直连模型要求 API 服务允许浏览器 CORS。如果服务商不允许，下一步需要加 VPS 后端代理。

## License

MIT
