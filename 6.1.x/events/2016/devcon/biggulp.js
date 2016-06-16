//TODO: secure password storage
// clean up base64auth files
// TODO: read http://blog.modulus.io/node.js-tutorial-how-to-use-request-module


var fs = require('fs');
var request = require("request");
var winston = require("winston");

function  formatDate  (d) {
                if (typeof d === 'number') d = new Date(d);
                if (!(d instanceof Date)) return d;
                function pad(n) { return n < 10 ? '0' + n : n; }
                return ("[" + pad(d.getHours()) + ":"+ pad(d.getMinutes()) + ":"+ pad(d.getSeconds()) + "]");
            }
var logger = new winston.Logger({
    level: 'debug',
    transports: [
        new (winston.transports.Console)({
            level: "info",
            timestamp: function () {
                return formatDate(Date.now());
            },
           
            formatter: function (options) {
                // Return string will be passed to logger.
            return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? ' '+ JSON.stringify(options.meta) : '' );
           }
        }),
        new (winston.transports.File)({
            name: 'debug-file',
            filename: 'logs/debug.log',
            level: 'debug'
        }),
        new (winston.transports.File)({
            name: 'silly-file',
            filename: 'logs/trace.log',
            level: 'silly'
        })
    ]
});

function invoke_liferay_api(config, api, payload, callback) {
    var cmdArray = [];
    var myCmd = {};
    myCmd[api] = payload;
    cmdArray.push(
        myCmd
    );
    invoke_liferay(config, cmdArray, callback);
}

/**
 * invoke_liferay with post request
 * @param {{server: string, base64auth: string}} config - config object with server name and base 64 authentication . 
 * @param {string} body - post body 
 * @param {function} callback - callback when post completes.
 */
function invoke_liferay(config, body, callback) {

    var invoke_path = (config.server.indexOf("https") === 0)? "/api/secure/jsonws/invoke" :  "/api/jsonws/invoke";
    var postrequest = {
        json: true,
        url: config.server + invoke_path,
        body: body,
        headers: { "Authorization": "Basic " + config.base64auth }
    };
    logger.debug(invoke_path);
    logger.debug("POST Request: ", postrequest);

    request.post(postrequest, function (err, httpResponse, body) {

        logger.silly("httpResponse: ", httpResponse);
        logger.debug("body: " + body);

        if (err) {
            logger.error(err);
            throw err;
        } else if (httpResponse && httpResponse.statusCode && (httpResponse.statusCode != 200)) {
            logger.error("An error seems to have occurred. Response Code " + httpResponse.statusCode, body);
            var errorobj = {
                statusCode: httpResponse.statusCode,
                body: body
            };
            throw errorobj;
        }
        else {
            if (body && body.exception) {
                logger.error("An exception occurred: " + body.exception);
                throw body.exception;
            } else { callback(body) }
        }
    });
}
function post_liferay(config, api, payload, callback) {
    var postrequest = {
        url: config.server + "/api/secure/jsonws" + api,
        form: payload,
        headers: { "Authorization": "Basic " + config.base64auth }
    };
    logger.info(postrequest);

    request.post(postrequest, function (err, httpResponse, body) {
        logger.silly("httpResponse: ", httpResponse);
        logger.debug("body: " + body);

        if (err) {
            logger.error(err);
            throw err;
        } else if (httpResponse && httpResponse.statusCode && (httpResponse.statusCode != 200)) {
            logger.error("An error seems to have occurred. Response Code " + httpResponse.statusCode, body);
            var errorobj = {
                statusCode: httpResponse.statusCode,
                body: body
            };
            throw errorobj;
        }
        else {

            var response = JSON.parse(body);
            if (response && response.exception) {
                logger.error("An exception occurred: " + response.exception);
                throw response.exception;
            } else { callback(body) }


        }
    });
}
function getArticle(config, article, cb) {
    var cmd = {
        "/journalarticle/get-article": {
            "groupId": article.groupId,
            "articleId": article.articleId
        }
    };

    invoke_liferay(config, cmd,
        function (jsonresponse) {
            logger.debug("body: " + jsonresponse.content);
            cb(jsonresponse);
        });
}
var ThemeDisplay = {
				getCDNDynamicResourcesHost: function () {
        return "https://cdn.lfrs.sl/web.liferay.com";
				},
				getCDNBaseURL: function () {
        return "https://cdn.lfrs.sl/web.liferay.com";
				},
				getCDNHost: function () {
        return "https://cdn.lfrs.sl/web.liferay.com";
				},
				getCompanyId: function () {
        return "1";
				},
				getCompanyGroupId: function () {
        return "8431626";
				},
				getUserId: function () {
        return "5";
				},



				getDoAsUserIdEncoded: function () {
        return "";
				},
				getPlid: function () {
        return "73285537";
				},


    getLayoutId: function () {
        return "1583";
    },
    getLayoutURL: function () {
        return "https://web.liferay.com/sign-in";
    },
    isPrivateLayout: function () {
        return "false";
    },
    getParentLayoutId: function () {
        return "0";
    },


				getScopeGroupId: function () {
        return "14";
				},
				getScopeGroupIdOrLiveGroupId: function () {
        return "14";
				},
				getParentGroupId: function () {
        return "14";
				},
				isImpersonated: function () {
        return false;
				},
				isSignedIn: function () {
        return false;
				},
				getDefaultLanguageId: function () {
        return "en_US";
				},
				getLanguageId: function () {
        return "en_US";
				},
				isAddSessionIdToURL: function () {
        return false;
				},
				isFreeformLayout: function () {
        return false;
				},
				isStateExclusive: function () {
        return false;
				},
				isStateMaximized: function () {
        return false;
				},
				isStatePopUp: function () {
        return false;
				},
				getPathContext: function () {
        return "";
				},
				getPathImage: function () {
        return "https://cdn.lfrs.sl/web.liferay.com/image";
				},
				getPathJavaScript: function () {
        return "/html/js";
				},
				getPathMain: function () {
        return "/c";
				},
				getPathThemeImages: function () {
        return "https://cdn.lfrs.sl/web.liferay.com/osb-community-theme/images";
				},
				getPathThemeRoot: function () {
        return "/osb-community-theme/";
				},
				getURLControlPanel: function () {
        return "/group/control_panel?doAsGroupId=14&refererPlid=73285537";
				},
				getURLHome: function () {
        return "https://web.liferay.comwww.liferay.com";
				},
				getSessionId: function () {



        return "";


				},
				getPortletSetupShowBordersDefault: function () {
        return false;
				}
};



module.exports = {
    viewArticleContent: function (config, article, languageid) {
        getArticle(config, article, function (jsonresponse) {
            //  https://web.liferay.com/de/c/journal/view_article_content?cmd=preview&groupId=67510365&articleId=74591624&version=1.2&languageId=de_DE&type=general&structureId=73728595&templateId=73728597
            //  https://web.liferay.com/de/c/journal/view_article_content?cmd=preview&groupId=67510365&articleId=74591624&version=1.2&languageId=de_DE&type=general&structureId=73728595&templateId=73728597
            //  https://web.liferay.com/de/c/journal/view_article_content?cmd=preview&groupId=67510365&articleId=74591624&version=1.2&languageId=en_US&type=general&structureId=73728595&templateId=73728597
            var getrequest = {
                url: config.server + "/de/c/journal/view_article_content",
                qs: {
                    //cmd: "preview",
                    groupId: article.groupId,
                    articleId: article.articleId,
                    version: jsonresponse.version,
                    languageId: languageid,
                    type: "general",
                    structureId: jsonresponse.structureId,
                    templateId: jsonresponse.templateId
                },
                headers: { "Authorization": "Basic " + config.base64auth }
            };
            logger.debug(getrequest);
            request.get(getrequest, function (err, httpResponse, body) {
                //  logger.silly("httpResponse: ", httpResponse);
                //  logger.debug("body: " + body);

                if (err) {
                    //    logger.error(err);
                } else if (httpResponse && httpResponse.statusCode && (httpResponse.statusCode != 200)) {
                    logger.error("An error seems to have occurred. Response Code " + httpResponse.statusCode);
                    var errorobj = {
                        statusCode: httpResponse.statusCode,
                        body: body
                    };
                    throw errorobj;
                }
                else {

                    var startBody = body.indexOf("<body>");
                    var endBody = body.indexOf("</body>");

                    var creamynougatcenter = body.substr(startBody + 6, endBody - startBody - 6);
                    logger.debug(creamynougatcenter);
                    logger.info("Writing article file: ", article);
                    fs.writeFile(article.filename, creamynougatcenter);

                }
            });
        });
    },
    getDisplayArticleByTitle: function (config, article) {

        var cmd = {
            "/journalarticle/get-display-article-by-url-title": {
                "groupId": article.groupId,
                "urlTitle": article.urlTitle,
            }
        };
        invoke_liferay(config, cmd,
            function (jsonresponse) {
                logger.info("body: " + jsonresponse.content);
            });
    },
    getArticle: getArticle,

    getArticleContent: function (config, article, locale) {
        var cmd = {
            "/journalarticle/get-article-content": {
                "groupId": article.groupId,
                "articleId": article.articleId,
                "languageId": locale,
                "themeDisplay": {
                    class: "com.liferay.portal.theme.ThemeDisplay",
                    _companyId: 1,
                    _companyGroupId: 8431626,
                    _scopeGroupeId: article.groupId,
                    _siteGroupId: article.groupId

                }
            }
        };
        invoke_liferay(config, cmd,
            function (jsonresponse) {
                logger.info("body: " + jsonresponse.content);
            });
    },
    updateStaticArticleContent: function (config, article) {

        // need to get version info first...
        logger.info("Updating article: ", article);
        var staticContent = [];
        var allLocales = [];
        article.locales.forEach(function (locale) {
            allLocales.push(locale.locale);
            var articleFile = fs.readFileSync(locale.filename).toString();
            staticContent.push({
                _: articleFile,
                $: {
                    "language-id": locale.locale
                }
            });
        });
        var availableLocales = allLocales.join(",");
        // make function for composing file names
        var obj = {
            root: {
                $: {
                    "available-locales": availableLocales, "default-locale": article.defaultLocale
                },
                "static-content": staticContent
            }
        };

        var xml2js = require("xml2js");
        var builder = new xml2js.Builder({ cdata: true, xmldec: { version: "1.0" } });
        var xml = builder.buildObject(obj);
        logger.silly(xml);

        // nest call to get latest version #
        var cmd = {
            "$article = /journalarticle/get-article": {
                "groupId": article.groupId,
                "articleId": article.articleId,
                "$update = /journalarticle/update-article": {
                    "@version": "$article.version",
                    "groupId": article.groupId,
                    "articleId": article.articleId,
                    "content": xml,
                    "serviceContext.scopeGroupId": article.groupId
                }
            }
        };
        invoke_liferay(config, cmd,
            function (jsonresponse) {
                logger.debug("body: " + jsonresponse.content);
            });
    },


    legacy: function () {
        var gulp = require("gulp");
        var request = require("request");
        var winston = require("winston");
        var fs = require('fs');
        var parseXML = require("xml2js").parseString;
        var xml2js = require("xml2js");

        var config = JSON.parse(fs.readFileSync('./config.json'));

        var logger = new winston.Logger({
            level: 'debug',
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({ filename: 'jctool.log' })
            ]
        });

        var filelogger = new winston.Logger({
            level: 'debug',
            transports: [
                new (winston.transports.File)({ filename: 'debug.log' })
            ]
        });

        var articleLookup = {
            groupId: "67510365",
            articleId: "74393728",
            filename: "devcon.js"
        };

        articleLookup = {
            groupId: "67510365",
            articleId: "73736824",
            filename: "bannerspain.lego"
        };


        articleLookup = {
            groupId: "67510365",
            articleId: "74431618",
            filename: "devconquotes.lego"
        };



        // deal with info: {"exception":"com.liferay.portlet.journal.NoSuchArticleException: No JournalArticle exists with the key {groupId=67510365, articleId=69690948, status=-1}"}
        //i
        articleLookup = {
            groupId: "47511614",
            articleId: "69690948",
            filename: "dachueberblick.lego"
        };
        articleLookup = {
            groupId: "67510365",
            articleId: "69933638",
            filename: "nascfp.lego"
        };

        articleLookup = {

            groupId: "39527293",
            articleId: "39575459",
            filename: "devcon2014cfp.lego"
        };

        articleLookup = {
            groupId: "67510365",
            articleId: "74431618",
            filename: "devconquotes.lego"
        };


        gulp.task("get-article", function () {
            logger.info("Welcome to liferay-jctool");

            function getArticle(myConfig, myArticle) {

                var postrequest = {
                    url: myConfig.server + "/api/secure/jsonws/journalarticle/get-article",
                    form: {
                        groupId: myArticle.groupId,
                        articleId: myArticle.articleId
                    },
                    headers: { "Authorization": "Basic " + myConfig.base64auth }
                };
                logger.info(postrequest);

                request.post(postrequest, function (err, httpResponse, body) {

                    if (httpResponse && httpResponse.statusCode && (httpResponse.statusCode != 200)) {
                        logger.error("An error seems to have occurred");

                        filelogger.debug("httpResponse: ", httpResponse);
                        logger.debug("body: " + body);
                    }
                    else {
                        logger.info(body);
                        var response = JSON.parse(body);

                        logger.info("body: " + response.content);
                        //fs.writeFile("in.xml", response.content);
                        parseXML(response.content, function (err, xmljsresult) {
                            logger.info(xmljsresult);

                            var errorWritingFile = function (err) {
                                if (err) logger.error("error writing file", err);
                            }
                            if (xmljsresult.root && xmljsresult.root["static-content"]) {
                                var contentarray = xmljsresult.root["static-content"];
                                for (var i = 0; i < contentarray.length; i++) {
                                    var contentobj = contentarray[i];
                                    logger.info("my content: " + contentobj._);
                                    logger.info("my attrs", contentobj.$);
                                    fs.writeFile(contentobj.$["language-id"] + "_" + articleLookup.filename,
                                        contentobj._, errorWritingFile);
                                }
                            }
                            else if (xmljsresult.root && xmljsresult.root["dynamic-element"]) {
                                //handleDynamicElement(xmljsresult.root, 1);
                                var lego = {};
                                handleDynamicElementLegoObject(lego, xmljsresult.root, 1);
                                //logger.info(lego);
                                var string = JSON.stringify(lego, null, '\t');
                                console.log(string);
                                var html = legotohtml(lego);
                                console.log("html: " + html);
                            }
                        });
                    }
                });
            }
            getArticle(config, articleLookup);
        });




        function pad(level) {

            var padding = "";
            for (var i = 0; i < level; i++) {
                padding += " ";
            }
            return padding;
        }

        function handleLegoDynamicElement(parent, level) {
            var legoobject = {};
            handleDynamicElementCallback(parent, level,
                function (objlevel, propertyobj, property) {
                    logger.info(pad(objlevel) + "property: " + property + ": " + propertyobj[property]);
                },
                function (objlevel, content) {

                    logger.info(pad(objlevel) + "content: " + content);
                }
            );
        }


        function handleDynamicElement(parent, level) {
            handleDynamicElementCallback(parent, level,
                function (objlevel, propertyobj, property) {
                    logger.info(pad(objlevel) + "property: " + property + ": " + propertyobj[property]);
                },
                function (objlevel, content) {

                    logger.info(pad(objlevel) + "content: " + content);
                }
            );
        }

        function handleDynamicElementCallback(parent, level, propertycallback, contentcallback) {
            if (parent.$) {
                for (var prop in parent.$) {
                    if (parent.$.hasOwnProperty(prop)) {
                        propertycallback(level, parent.$, prop);
                        //logger.info(pad(level) + "property: " + prop + ": " + parent.$[prop]);
                    }
                }
            }
            var content = parent["dynamic-content"];
            if (content) {
                for (var i = 0; i < content.length; i++) {
                    contentcallback(level, content[i]);
                    //logger.info(pad(level) + "content: " + content[i]);
                }
            }
            var elements = parent["dynamic-element"];
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    handleDynamicElement(element, level + 1);
                }

            }
        }




        function handleDynamicElementLegoObject(legoobject, parent, level) {
            if (parent.$) {
                for (var prop in parent.$) {
                    if (parent.$.hasOwnProperty(prop)) {
                        legoobject[prop] = parent.$[prop];
                    }
                }
            }
            var content = parent["dynamic-content"];
            if (content) {
                if (content.length > 1) throw "Extra content";
                else if (content.length === 1)
                    legoobject.content = content[0];
                //for (var i = 0; i < content.length; i++) {
                //    if (!legoobject.content) legoobject.content = [];
                //    legoobject.content.push( content[i]); 
                //}
            }
            var elements = parent["dynamic-element"];
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var elemName = element.$["name"];
                    var newElem = {};
                    if (elemName.match(/^(lego_section_attr|lego_block_attr|lego_element_attr)$/)) {
                        if (!legoobject[elemName]) legoobject[elemName] = [];
                        legoobject[elemName].push(newElem);
                    } else {
                        legoobject[elemName] = newElem;
                    }


                    handleDynamicElementLegoObject(newElem, element, level + 1);
                }

            }
        }


        function legotohtml(lego) {

            var html = "";

            for (var i = 0; i < lego.lego_section_attr.length; i++) {
                var section = "section-" + (i + 1);
                html += "<div class=\"" + section + "\">\n";

                var blocks = lego.lego_section_attr[i].lego_block_attr;
                for (var j = 0; j < blocks.length; j++) {
                    var block = "block-" + (j + 1);
                    html += "<div class=\"" + block + "\">\n";

                    var elements = blocks[j].lego_element_attr;
                    for (var k = 0; k < elements.length; k++) {

                        var tag = elements[k].element_type.content;
                        var attributes = elements[k].content + " class=\"" + elements[k].element_css_class.content + "\"";
                        html += "<" + tag + attributes + ">";
                        html += elements[k].element_content.content;
                        html += "</" + tag + ">\n";
                    }
                    html += "</div>\n";
                }

                html += "</div>\n";
            }
            return html;

        }
        /*
        var legotaghandlerdef = {
            button: {classes: ["btn"], tag: "a"},
            heading: {classes: ["redesign","heading"], tag: "h2"},
            image: {classes: ["lego-img"], tag: "img"},
            sub_heading: {classes: ["redesign", "sub-heading"], tag: "p"}
        };
        function legotaghandler(html, tag, content, cssclasses, attributes) {
            var mytag = tag;
            if (legotaghandlerdef[tag]) {
                legotaghandlerdef[tag].classes.split(" ").forEach(function(elem) {
                    
                    cssclasses += " " + elem;
                }   );    
                mytag = legohandlerdef[tag].tag;
            } 
            else {
                
                
            }
            
            
           var attributes = elements[k].content + " class=\"" + elements[k].element_css_class.content + "\"";
           html += "<" + tag + attributes + ">";
           html += elements[k].element_content.content;
           html += "</" + tag + ">\n";   
          }
            
                                                #if ($element.element_type.data == "button")
                                                    <a class="btn $element_css_class" id="button-${reserved-article-id.data}${section_count}${block_count}$velocityCount" $element.data>$element.element_content.data</a>
                                                #elseif ($element.element_type.data == "heading")
                                                    <h2 class="redesign heading $element_css_class" $element.data>$element.element_content.data</h2>
                                                #elseif ($element.element_type.data == "image")
                                                    <img class="lego-img $element_css_class" $element.data src="$element.element_content.data" />
                                                #elseif ($element.element_type.data == "sub_heading")
                                                    <p class="redesign sub-heading $element_css_class" $element.data>$element.element_content.data</p>
                                                #else
                                                    <$element.element_type.data class="$element_css_class" $element.data>
                                                        $element.element_content.data
                                                    </$element.element_type.data>
                                                #end
        
        }
        
        */

        var fileEntriesSpain = {
            repositoryId: "67510365",
            folderId: "73736624",
        };
        var fileEntriesSpainExternos = {
            repositoryId: "67510365",
            folderId: "74496094",
        };

        var fileEntriesSpainSponsors2015 = {
            repositoryId: "47511614",
            folderId: "54150600"
        };
        var fileEntriesSpainSponsors2016 = {
            repositoryId: "67510365",
            folderId: "74533651"
        };


        gulp.task("get-file-entries", function () {
            logger.info("Welcome to liferay-jctool");

            function getFileEntries(myConfig, myFolder) {

                var postrequest = {
                    url: myConfig.server + "/api/secure/jsonws/dlapp/get-file-entries",
                    form: {
                        repositoryId: myFolder.repositoryId,
                        folderId: myFolder.folderId
                    },
                    headers: { "Authorization": "Basic " + myConfig.base64auth }
                };
                logger.info(postrequest);

                request.post(postrequest, function (err, httpResponse, body) {

                    if (httpResponse && httpResponse.statusCode && (httpResponse.statusCode != 200)) {
                        logger.error("An error seems to have occurred");

                        filelogger.debug("httpResponse: ", httpResponse);
                        logger.debug("body: " + body);
                    }
                    else {
                        var response = JSON.parse(body);
                        //logger.info("response: ",  httpResponse)
                        //logger.info("body: " + response);
                        var string = JSON.stringify(response, null, '\t');
                        logger.info(string);
                        response.forEach(function (elem) {
                            console.log(elem.groupId + "," + elem.uuid + "," + elem.version + "," + elem.title);

                        });
                    }
                });
            }
            getFileEntries(config, fileEntriesSpainSponsors2016);
        });

    }

};

module.exports.invoke_liferay = invoke_liferay;
