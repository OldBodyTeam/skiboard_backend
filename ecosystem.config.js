module.exports = {
  apps: [
    {
      name: 'lumii-backend',
      script: 'dist/main.js', // 你的应用程序的入口文件
      instances: '1', // 根据你的需求设置实例数量
      autorestart: true, // 如果应用程序崩溃，自动重启
      watch: false, // 是否监视文件变化并自动重启
      max_memory_restart: '10G', // 如果内存占用超过1G，自动重启
      env: {
        NODE_ENV: 'production', // 设置环境变量
      },
    },
  ],
};
