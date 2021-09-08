
                        try
                        {
                            var linksArray = '  https://live.primis.tech/content/video/hls/hls.0.12.4_2.min.js  https://live.primis.tech/content/prebid/prebidVid.4.43.0_4.min.js   https://live.primis.tech/live/liveVideo.php?vpaidManager=sekindo&s=58057&ri=6C69766553746174737C736B317B54307D7B64323032312D30382D33305F32317D7B7331363336313335317D7B4333307D7B53643364334C6E526F5A5778765957527664585175593239747D7B626368726F6D657D7B716465736B746F707D7B6F6D61636F73787D7B583630307D7B593432357D7B66367D7B4C31303236347DFEFE&userIpAddr=71.251.3.49&userUA=Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_15_7%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F92.0.4515.159+Safari%2F537.36&debugInformation=&isWePassGdpr=1&schain=1.0%2C1%21network-n.com%2Cpa_fec65292%2C1&noViewableMidrollPolicy=vary&isDoublePreroll=1&autoSkipVideoSec=30&c2pWaitTime=10&csuuid=60f96a97d1eba&debugInfo=16361351_&debugPlayerSession=&pubUrlDEMO=&isAsyncDEMO=0&customPlaylistIdDEMO=&sta=16361351&showLogo=0&clkUrl=&plMult=-1&schedule=eyJwcmVfcm9sbCI6MSwibWlkX3JvbGwiOltdLCJnYXAiOiJhdXRvIn0%3D&content=plembed26e6lqmhozrp&secondaryContent=&x=600&y=425&pubUrl=https%3A%2F%2Fwww.theloadout.com%2Fdota-2%2Fcheats&contentNum=1&flow_closeBtn=1&flowCloseTimeout=0&flow_closeButtonPosition=right&flow_direction=br&flow_horizontalOffset=10&flow_bottomOffset=95&impGap=2&flow_width=400&flow_height=225&videoType=flow&gdpr=0&gdprConsent=&contentFeedId=&geoLati=40.7157&geoLong=-74&vpTemplate=10264&flowMode=seenboth&isRealPreroll=0&playerApiId=&isApp=0&ccpa=0&ccpaConsent='.split(' ');

                            for(var l = 0; l < linksArray.length; l++)
                            {
                                if(linksArray[l].length > 10)
                                {
                                    var sc = document.createElement('script');
                                    sc.type = 'text/javascript';
                                    sc.async = false;
                                    sc.src = linksArray[l];
                                    document.head.appendChild(sc);
                                }
                            }
                        }
                        catch(e)
                        {
                            document.write('<script type="text/javascript" src="https://live.primis.tech/content/video/hls/hls.0.12.4_2.min.js">\x3C/script><script type="text/javascript" src="https://live.primis.tech/content/prebid/prebidVid.4.43.0_4.min.js">\x3C/script><script type=' + "'" + 'text/javascript' + "'" + ' language=' + "'" + 'javascript' + "'" + ' src="https://live.primis.tech/live/liveVideo.php?vpaidManager=sekindo&s=58057&ri=6C69766553746174737C736B317B54307D7B64323032312D30382D33305F32317D7B7331363336313335317D7B4333307D7B53643364334C6E526F5A5778765957527664585175593239747D7B626368726F6D657D7B716465736B746F707D7B6F6D61636F73787D7B583630307D7B593432357D7B66367D7B4C31303236347DFEFE&userIpAddr=71.251.3.49&userUA=Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_15_7%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F92.0.4515.159+Safari%2F537.36&debugInformation=&isWePassGdpr=1&schain=1.0%2C1%21network-n.com%2Cpa_fec65292%2C1&noViewableMidrollPolicy=vary&isDoublePreroll=1&autoSkipVideoSec=30&c2pWaitTime=10&csuuid=60f96a97d1eba&debugInfo=16361351_&debugPlayerSession=&pubUrlDEMO=&isAsyncDEMO=0&customPlaylistIdDEMO=&sta=16361351&showLogo=0&clkUrl=&plMult=-1&schedule=eyJwcmVfcm9sbCI6MSwibWlkX3JvbGwiOltdLCJnYXAiOiJhdXRvIn0%3D&content=plembed26e6lqmhozrp&secondaryContent=&x=600&y=425&pubUrl=https%3A%2F%2Fwww.theloadout.com%2Fdota-2%2Fcheats&contentNum=1&flow_closeBtn=1&flowCloseTimeout=0&flow_closeButtonPosition=right&flow_direction=br&flow_horizontalOffset=10&flow_bottomOffset=95&impGap=2&flow_width=400&flow_height=225&videoType=flow&gdpr=0&gdprConsent=&contentFeedId=&geoLati=40.7157&geoLong=-74&vpTemplate=10264&flowMode=seenboth&isRealPreroll=0&playerApiId=&isApp=0&ccpa=0&ccpaConsent=">\x3C/script>');
                        }
                        