'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface TrackingConfig {
  ga?: string;
  fa?: string;
  tiktok?: string;
}

export default function TrackingPixels() {
  const [config, setConfig] = useState<TrackingConfig | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('https://admin.pigroup.vn/api/trackings')
      .then((res) => res.json())
      .then(setConfig)
      .catch((err) => console.error('Failed to load tracking config:', err));
  }, []);

  useEffect(() => {
    if (!config) return;

    // Facebook Page View
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    // TikTok Page View
    if ((window as any).ttq) {
      (window as any).ttq.page();
    }

    // Google Analytics SPA Tracking
    if ((window as any).gtag && config.ga) {
      (window as any).gtag('config', config.ga, {
        page_path: pathname,
      });
    }
  }, [pathname, config]);

  if (!config) return null;

  return (
    <>
      {/* Google Analytics */}
      {config.ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.ga}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {config.fa && (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${config.fa}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* TikTok Pixel */}
      {config.tiktok && (
        <Script id="ttq-init" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = w[t] = w[t] || [];
              ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie"];
              ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                  t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                }
              };
              for (var i = 0; i < ttq.methods.length; i++) {
                ttq.setAndDefer(ttq, ttq.methods[i]);
              }
              ttq.instance = function (t) {
                var e = ttq._i[t] || [];
                for (var n = 0; n < ttq.methods.length; n++) {
                  ttq.setAndDefer(e, ttq.methods[n]);
                }
                return e;
              };
              ttq.load = function (e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                ttq._i[e]._u = i;
                ttq._t = ttq._t || {};
                ttq._t[e] = +new Date();
                ttq._o = ttq._o || {};
                ttq._o[e] = n || {};
                var o = document.createElement("script");
                o.type = "text/javascript";
                o.async = !0;
                o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a);
              };

              ttq.load('${config.tiktok}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  );
}
