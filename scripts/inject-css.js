// 在构建时自动向主题 CSS 中注入自定义样式
hexo.extend.filter.register('after_generate', function() {
  const fs = require('fs');
  const path = require('path');

  // 主题样式文件路径
  const styleFile = path.join(
    hexo.base_dir,
    'node_modules/hexo-theme-icarus/source/css/style.styl'
  );

  try {
    let content = fs.readFileSync(styleFile, 'utf8');
    if (!content.includes('// Hide footer')) {
      content += 
        `
        // Hide footer
        footer {
            padding: 2rem 0 !important;
            border-top: 1px solid #eceff2 !important;
            color: #565a5f !important;
            font-size: 16px !important;
            text-align: center !important;
            background-color: #f5f8f9 !important;
            .footer-logo {
                display: none !important;
            }
            p:nth-child(2) {
                display: none !important;
            }
            .level { 
                justify-content: center !important; 
            }
        }
        h1, h2, h3, h4, h5, h6 {
            font-weight: bold !important;
        }
        .article-entry {
            line-height: 1.6 !important;
            margin: 1em 0 !important;
        }
        figure
            text-align: center
            margin-left: 0;
            margin-right: 0;
            figcaption
                text-align: center
                color: #777;
                font-size: .9em;
            br
                display: none;
            img
                margin-top: 10px !important;
                margin-bottom: 10px !important;
        `;
      fs.writeFileSync(styleFile, content, 'utf8');
      console.log('✓ CSS 自定义样式已注入');
    }
  } catch (err) {
    console.error('注入 CSS 失败:', err);
  }
});
