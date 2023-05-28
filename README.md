# DNS Server Docker 镜像

这个应用程序是一个简单的 DNS 服务器，它使用 Node.js 编写。它能够接收 DNS 请求并返回相应的 IP 地址。

## 功能

- 监听 UDP 53 端口，作为 DNS 服务器接收来自客户端的 DNS 请求。
- 解析 DNS 请求中的域名，并返回相应的 IPv4 地址。
- 如果请求中的域名已经是一个 IP 地址，直接返回该 IP 地址。
- 使用 `dns-packet` 包进行 DNS 请求和响应的编码和解码。
- 当收到 DNS 请求后，通过 Node.js 内置的 `dns` 模块解析域名对应的 IPv4 地址。
- 将解析后的 IPv4 地址封装成 DNS 响应报文，发送给客户端。

## 使用方法

构建 Docker 镜像：

   ```shell
   docker build -t jonneywu/dns-server:latest .
   ```

运行 Docker 容器：

   ```shell
   docker run -p 53:53/udp --rm -ti --name dns-server-container jonneywu/dns-server:latest
   ```

   **注意：** 如果端口 53 在主机上已被占用，请更改主机端口，例如 `-p 5353:53/udp`。

现在你的 DNS 服务器正在运行，并监听在端口 53 上。

测试运行结果:

   ```shell
   dig @127.0.0.1 1.2.3.42.www.baidu.com

   ```

## 环境变量

你可以通过设置以下环境变量来配置 DNS 服务器：

- `DNS_SERVER_PORT`：DNS 服务器监听的端口，默认为 `53`。

## 注意事项

- 请注意，此应用程序仅为示例，可能不适用于生产环境。在实际部署中，请考虑安全性、性能和可靠性等方面的需求。
- 当前的实现仅支持解析 IPv4 地址，不支持其他类型的记录（如 IPv6、CNAME 等）。
- 如果需要修改 DNS 服务器的逻辑，可以编辑 `app.js` 文件，并重新启动应用程序。
- 为了使 DNS 服务器能够正常工作，确保运行该应用程序的计算机具有网络连接，并且 UDP 53 端口未被其他应用程序占用。
- 使用此 DNS 服务器时，请注意可能的安全风险和隐私问题，并采取适当的安全措施。
