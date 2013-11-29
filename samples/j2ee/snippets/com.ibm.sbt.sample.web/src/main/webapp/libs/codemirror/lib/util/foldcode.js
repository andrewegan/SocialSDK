/*  (c) Copyright IBM Corp. 2010 - Licensed under the Apache License, Version 2.0 */

CodeMirror.tagRangeFinder=function $DBbl_(cm,_1){var _2="A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";var _3=_2+"-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";var _4=new RegExp("^["+_2+"]["+_3+"]*");var _5=cm.getLine(_1.line);var _6=false;var _7=null;var _8=_1.ch;while(!_6){_8=_5.indexOf("<",_8);if(-1==_8){return;}if(_8+1<_5.length&&_5[_8+1]=="/"){_8++;continue;}if(!_5.substr(_8+1).match(_4)){_8++;continue;}var _9=_5.indexOf(">",_8+1);if(-1==_9){var l=_1.line+1;var _a=false;var _b=cm.lineCount();while(l<_b&&!_a){var lt=cm.getLine(l);_9=lt.indexOf(">");if(-1!=_9){_a=true;var _c=lt.lastIndexOf("/",_9);if(-1!=_c&&_c<_9){var _d=_5.substr(_c,_9-_c+1);if(!_d.match(/\/\s*\>/)){return;}}}l++;}_6=true;}else{var _e=_5.lastIndexOf("/",_9);if(-1==_e){_6=true;}else{var _d=_5.substr(_e,_9-_e+1);if(!_d.match(/\/\s*\>/)){_6=true;}}}if(_6){var _f=_5.substr(_8+1);_7=_f.match(_4);if(_7){_7=_7[0];if(-1!=_5.indexOf("</"+_7+">",_8)){_6=false;}}else{_6=false;}}if(!_6){_8++;}}if(_6){var _10="(\\<\\/"+_7+"\\>)|(\\<"+_7+"\\>)|(\\<"+_7+"\\s)|(\\<"+_7+"$)";var _11=new RegExp(_10);var _12="</"+_7+">";var _13=1;var l=_1.line+1;var _b=cm.lineCount();while(l<_b){_5=cm.getLine(l);var _14=_5.match(_11);if(_14){for(var i=0;i<_14.length;i++){if(_14[i]==_12){_13--;}else{_13++;}if(!_13){return {from:{line:_1.line,ch:_9+1},to:{line:l,ch:_14.index}};}}}l++;}return;}};CodeMirror.braceRangeFinder=function $DBbm_(cm,_15){var _16=_15.line,_17=cm.getLine(_16);var at=_17.length,_18,_19;for(;;){var _1a=_17.lastIndexOf("{",at);if(_1a<_15.ch){break;}_19=cm.getTokenAt({line:_16,ch:_1a}).type;if(!/^(comment|string)/.test(_19)){_18=_1a;break;}at=_1a-1;}if(_18==null||_17.lastIndexOf("}")>_18){return;}var _1b=1,_1c=cm.lineCount(),end,_1d;outer:for(var i=_16+1;i<_1c;++i){var _1e=cm.getLine(i),pos=0;for(;;){var _1f=_1e.indexOf("{",pos),_20=_1e.indexOf("}",pos);if(_1f<0){_1f=_1e.length;}if(_20<0){_20=_1e.length;}pos=Math.min(_1f,_20);if(pos==_1e.length){break;}if(cm.getTokenAt({line:i,ch:pos+1}).type==_19){if(pos==_1f){++_1b;}else{if(!--_1b){end=i;_1d=pos;break outer;}}}++pos;}}if(end==null||end==_16+1){return;}return {from:{line:_16,ch:_18+1},to:{line:end,ch:_1d}};};CodeMirror.indentRangeFinder=function $DBbn_(cm,_21){var _22=cm.getOption("tabSize"),_23=cm.getLine(_21.line);var _24=CodeMirror.countColumn(_23,null,_22);for(var i=_21.line+1,end=cm.lineCount();i<end;++i){var _25=cm.getLine(i);if(CodeMirror.countColumn(_25,null,_22)<_24){return {from:{line:_21.line,ch:_23.length},to:{line:i,ch:_25.length}};}}};CodeMirror.newFoldFunction=function $DBbo_(_26,_27){if(_27==null){_27="↔";}if(typeof _27=="string"){var _28=document.createTextNode(_27);_27=document.createElement("span");_27.appendChild(_28);_27.className="CodeMirror-foldmarker";}return function(cm,pos){if(typeof pos=="number"){pos={line:pos,ch:0};}var _29=_26(cm,pos);if(!_29){return;}var _2a=cm.findMarksAt(_29.from),_2b=0;for(var i=0;i<_2a.length;++i){if(_2a[i].__isFold){++_2b;_2a[i].clear();}}if(_2b){return;}var _2c=_27.cloneNode(true);CodeMirror.on(_2c,"mousedown",function(){_2d.clear();});var _2d=cm.markText(_29.from,_29.to,{replacedWith:_2c,clearOnEnter:true,__isFold:true});};};