javascript:
document.title = "’・。.Meta bot👾.。・’";mdk=0;
GASURL="https://script.google.com/macros/s/AKfycbxTbwMVq9z_cevgrRmNMkHhlRwlnxNT9K93mT8GWNyqmBu_OLwAZKdeqPCkRP676WX7/exec?";
MSGGASURL="https://script.google.com/macros/s/AKfycbxwKDs_3N1L1NbisBYeGnXW932s8n0Ux7r7iu9Njjk9T41Ffz7SXXARoMmrVO3LLz76Qw/exec?msg=";
clean="あ\n\nわ\n\nひ\n\nら\n\nバ\n\nブ\n\nル\n\n";rmCnt=0;beMax="";msgLen=0;hatuCnt=0;logSpeed="-";saigoPL="";
xhr = new XMLHttpRequest();sName="[ⴜeta(. . )☑️]";maxLen=150;timeCnt=0;
apiText3=JSON.parse(localStorage.getItem("plData"));
document.body.innerHTML="";Master="◆Awakun.0rvDl";
document.body.background="https://pbs.twimg.com/media/GObDNLcaEAAy_Zg?format=jpg&name=large";
blCnt=0;kiCnt=0;
setBase1='<p style="background-color:black;opacity:0.7;width: fit-content;border-radius: 5px 5px 5px 5px;" id="zako"><font size="3" color="white">(. .　)now loading...</font></p>
<input type="button" value="発言" style="margin:0px;background-color:black;opacity:0.5;color:white;border-radius: 5px 5px 5px 5px;" onclick="mmssgg=document.getElementById(\'msgInput\').value.replace(/　/g,\' \');if(mmssgg!==\'\'){fetch(\'https://script.google.com/macros/s/AKfycbzAAP_AVEth_ElF5gxRzfFIQCSFAI1FX-Sultv_3ubJpyko2z8TceF_5fcOh_5ixXQ/exec?msg=\'+mmssgg);document.getElementById(\'msgInput\').value=\'\';cls=\'mmssgg\';iro=\'white\';document.getElementById(\'Hbox\').innerHTML=\'<p class=\'+cls+\'><font color=\'+iro+\'>あわ(\'+Master+\')\'+\'「\'+mmssgg+\'」</font></p>\'+document.getElementById(\'Hbox\').innerHTML;}">　<input type="button" style="margin:0px;background-color:black;opacity:0.5;color:white;border-radius: 5px 5px 5px 5px;" value="蹴りコマンド" onclick="javascript:document.getElementById(\'msgInput\').value=\'$kick \'+saigoPL;"><br>
%3Ctextarea id="msgInput" style="width:1450px;height:100px;margin:0px;background-color:black;opacity:0.5;color:white;border-radius: 5px 5px 5px 5px;" class="dede"></textarea><input type="button" onclick="javascript:if(document.getElementById(\'msgInput\').value!==\'\'){document.cFrame.location.href = document.getElementById(\'msgInput\').value;}else{document.cFrame.location.href = \'https://www.google.com/?igu=1\';}" value="◎" id="mBtn"><div id="Hbox">';
setBase2='</div><br><style>.dede{float:right;}#msgInput{float:left;}#Hbox{float:left;margin: 0px 0px 0px 30px;}#mBtn{float:right;}</style>';
rdymsg=["tinpo"];
api2='https://script.google.com/macros/s/AKfycbyvNNMgtC7af8r30Kd5nl5jF0itPeKqOUMWPTDkTkrjJLckwSP14D0s5kmsE2lxrgYsYA/exec';
var url='https://zinro.net/m/api/?mode=message&id';
document.body.innerHTML=setBase1+setBase2;
document.getElementById("Hbox").style.overflow="scroll";
document.getElementById("Hbox").style.width="1421px";
document.getElementById("Hbox").style.height="550px";

fetch(MSGGASURL+sName+"起動しました。");

var fn = function() {

fetch(url).then(function(response) {
 return response.text();}).then(function(text) {
apiText=JSON.parse(text);
fetch(api2).then(function(response) {
 return response.text();
}).then(function(text2) {
apiText2=JSON.parse(text2);

document.getElementById("zako").innerHTML='<font size="3" color="white">(. .　)入室者: '+Object.keys(apiText2.players).length+'人, 無敵化時刻: '+String(Number(apiText2.player.created.substr(11,2))+4)+apiText2.player.created.substr(13,19)+', ログ速さ: '+logSpeed+'[logs/min]'+'</font>';

n=10;while(n>-1){

if(rdymsg.includes(apiText[n].id)!==true){
for(odi=document.getElementsByClassName("mmssgg").length-1;odi>-1;odi--){
	document.getElementsByClassName("mmssgg")[odi].remove();
}
if(document.visibilityState !== 'visible'){mdk++;document.title = "’・。.Meta bot👾.。・’"+" ("+mdk+")";}else{mdk=0;document.title = "’・。.Meta bot👾.。・’";}
rdymsg.push(apiText[n].id);hatuCnt++;
var msg=apiText[n].message;var from=apiText[n].from_user;
if(from!=="鯖"&&(msg.indexOf("あわ")!==-1||msg.indexOf("泡")!==-1)&&from!=="あわ"){iro="#00FF00";trpC=apiText2.players[from].trip;}else if(from!=="鯖"){iro="#ffffff";try{trpC=apiText2.players[from].trip;}catch(error){trpC="null";}}else{trpC="null";iro="#a600ff";}
if(trpC=="◆Awakun.0rvDl"&&msg.indexOf(sName)==-1){rmCnt++;}
isAd=apiText3.adTrip.includes(trpC) == true;isMs=Master.includes(trpC) == true;
document.getElementById("Hbox").innerHTML='<p style="background-color:black;opacity:0.7;width: fit-content;border-radius: 5px 5px 5px 5px;"><font color='+iro+' size="5">'+from+"("+trpC+")"+"「"+msg+"」</font></p><br><br>"+document.getElementById("Hbox").innerHTML;


if (from=='鯖' && msg.indexOf('さんが入室しました')!==-1){
	newPL=msg.replace('さんが入室しました', '');cmTrip=apiText2.players[newPL].trip;trpC=cmTrip;saigoPL=newPL;
	if(apiText3.bTrip.includes(cmTrip) == true||newPL.indexOf("ﾗﾌｨ")!==-1||newPL.indexOf("ラフィ")!==-1){
		fetch(GASURL+"kid="+apiText2.players[newPL].id);
	}else{
		Wcnt=0;idk="N";
		while(Wcnt<apiText3.banName.length){
			if(newPL.indexOf(apiText3.banName[Wcnt])!==-1&&apiText3.adTrip.includes(trpC) !== true){
				idk=apiText2.players[newPL].id;
				if(apiText3.bTrip.includes(trpC) !== true && trpC!==""){apiText3.bTrip.push(trpC);}
				fetch(GASURL+"kid="+idk);
			}
			Wcnt++;
		}
		if(idk=="N"){
			if(apiText3.adTrip.includes(cmTrip)){
				fetch(MSGGASURL+sName+"おかえりなさいませ、"+newPL+"("+cmTrip+")様。");
			}else{
				fetch(MSGGASURL+sName+"こんにちは、"+newPL+"("+cmTrip+")さん。");
			}
		}
	}
}

if(msg=='$admin list'&&isAd){
	fetch(MSGGASURL+sName+"admin listには\n"+apiText3.adTrip.length+"人の管理者がいます。");
}

if(msg.indexOf('$addmin ')!==-1&&isMs){
	addPL=msg.replace('$addmin ','');
	if(apiText3.adTrip.indexOf(addPL)!==-1){fetch(MSGGASURL+sName+"トリップ: "+addPL+"はadmin list上にすでに存在します。");}else{apiText3.adTrip.push(addPL);fetch(MSGGASURL+sName+"トリップ: "+addPL+"に管理者権限を付与しました。");}
}

if(msg.indexOf('$remadmin ')!==-1&&isMs){remPL=msg.replace('$remadmin ','');apiText3.adTrip=apiText3.adTrip.filter(function(v){return ! remPL.includes(v);});
	fetch(MSGGASURL+sName+"トリップ: "+remPL+"から管理者権限を剥奪しました。");}

if(msg.indexOf('$rembt ')!==-1&&isMs){remPL=msg.replace('$rembt ','');apiText3.bTrip=apiText3.bTrip.filter(function(v){return ! remPL.includes(v);});
	fetch(MSGGASURL+sName+remPL+"をbantripから削除しました。");}

if(msg.indexOf('$rembn ')!==-1&&isMs){remPL=msg.replace('$rembn ','');apiText3.banName=apiText3.banName.filter(function(v){return ! remPL.includes(v);});
	fetch(MSGGASURL+sName+remPL+"をbannameから削除しました。");}

if(msg.indexOf('$addwrd ')!==-1&&isMs){
	addwrd=msg.replace('$addwrd ','');
	apiText3.NGwrd.push(addwrd);fetch(MSGGASURL+sName+addwrd+"を禁止ワードに追加しました。");
}

if(msg.indexOf('$remwrd ')!==-1&&isMs){remPL=msg.replace('$remwrd ','');apiText3.NGwrd=apiText3.NGwrd.filter(function(v){return ! remPL.includes(v);});
	fetch(MSGGASURL+sName+remPL+"を禁止ワードから削除しました。");}

if(msg=="$save all" && isMs){localStorage.setItem("plData",JSON.stringify(apiText3));fetch(MSGGASURL+sName+"変更内容をセーブしました。");}

if (msg.indexOf('$cmd ')!==-1&&isAd){
	xhrSet();cmdA=msg.replace("$cmd ","").replace(/amp;/g,"");xhr.send(cmdA);
}

if(msg.indexOf('$script ')!==-1&&isMs){eval(msg.replace('$script ',''));}

if(msg.indexOf('$ban ')!==-1&&isMs){
	addPL=msg.replace('$ban ','');
	apiText3.banName.push(addPL);fetch(MSGGASURL+sName+addPL+"の入室を禁止しました。");
}

if(msg.indexOf('$kick ')!==-1&&isAd){
kikPL=msg.replace('$kick ','');
	try{
	if(apiText3.adTrip.includes(apiText2.players[kikPL].trip) !== true){
	idk=apiText2.players[kikPL].id;btrip=apiText2.players[kikPL].trip;if(btrip!=="非公開" && apiText3.bTrip.includes(btrip) !== true && btrip!=="")	{apiText3.bTrip.push(btrip);}
	fetch(GASURL+"kid="+idk);fetch(MSGGASURL+sName+"粛聖！あわビ――――ムwwwww");}
	}catch(error){fetch(MSGGASURL+sName+"Error: kickを試みましたが、その名前のプレイヤーは存在しません。");}
}

if (msg.length >= maxLen&&apiText3.adTrip.includes(trpC) !== true) {
idk=apiText2.players[from].id;
if(apiText3.bTrip.includes(trpC) !== true && trpC!==""){apiText3.bTrip.push(trpC);}
fetch(GASURL+"kid="+idk);fetch(MSGGASURL+sName+"粛聖！あわビ――――ムwwwww");
}

if(msg.indexOf("็")!==-1||msg.indexOf("่")!==-1||msg.indexOf("้")!==-1||msg.indexOf("๊")!==-1||msg.indexOf("๋")!==-1||msg.indexOf("์")!==-1||msg.indexOf("ํ")!==-1||msg.indexOf("ฺ")!==-1||msg.indexOf("ู")!==-1||msg.indexOf("ุ")!==-1||msg.indexOf("ื")!==-1||msg.indexOf("ึ")!==-1||msg.indexOf("ี")!==-1||msg.indexOf("ิ")!==-1||msg.indexOf("ࣚ")!==-1||msg.indexOf("ࣛ")!==-1||msg.indexOf("ࣜ")!==-1||msg.indexOf("ࣝ")!==-1||msg.indexOf("ࣞ")!==-1){
	if(apiText3.adTrip.includes(trpC)!==true){
		idk=apiText2.players[from].id;
		if(apiText3.bTrip.includes(trpC) !== true && trpC!==""){apiText3.bTrip.push(trpC);}
		fetch(GASURL+"kid="+idk);fetch(MSGGASURL+sName+"粛聖！あわビ――――ムwwwww");
	}
}

Wcnt=0;
while(Wcnt<apiText3.NGwrd.length){
if(msg.indexOf(apiText3.NGwrd[Wcnt])!==-1&&apiText3.adTrip.includes(trpC) !== true){
idk=apiText2.players[from].id;
if(apiText3.bTrip.includes(trpC) !== true && trpC!==""){apiText3.bTrip.push(trpC);}fetch(GASURL+"kid="+idk);fetch(MSGGASURL+sName+"粛聖！あわビ――――ムwwwww");}
Wcnt++;
}

if(msg.indexOf('$maxlen ')!==-1&&isAd){
maxLen=msg.replace('$maxlen ','');
fetch(MSGGASURL+sName+maxLen+'文字以上の発言を規制します。');
}

if(msg==('$help')){
	fetch(MSGGASURL+sName+"botのhelpはここにあります→https://1145141919.wiki.fc2.com/wiki/bothelp");
}

if(msg.indexOf("$info ")!==-1 && isAd){infoSrch(msg.replace('$info ', ''),1);}
if(msg.indexOf("$infobn ")!==-1 && isAd){infoSrch(msg.replace('$infobn ', ''),0);}

if(msg.indexOf("$ai ")!==-1&&isAd){
	trsM="https://script.google.com/macros/s/AKfycbz3CM8sdK9NLCfupcHf85-UcpGaCSWAyxfJk1AU-rJKcGJPiq9VmucEe4SLsqPzr8UuYQ/exec?msg=";
	AIMsg=msg.replace("$ai ","");trsM=trsM+"これは君あてのメッセージです→「"+AIMsg+"」 レスポンスは120文字以内で、一人称は「あわ」で、ツンデレ口調で返して！";
	fetch(trsM).then(function(response) {
	    return response.text();}).then(function(text) {
	      fetch(MSGGASURL+sName+text.replace(/\\n/g," ").replace(/"/g,"").replace(/\*/g,"").replace(/120文字/g,""));
	    });
}


}
n=n-1;}

});});

if(timeCnt>30){
	logSpeed=Math.round(hatuCnt*10)/10;
	if(rmCnt==0&&beMax==""){
		beMax=maxLen;
		maxLen="100";
	}
	localStorage.setItem("plData",JSON.stringify(apiText3));timeCnt=0;rmCnt=0;hatuCnt=0;
}timeCnt++;
if(rmCnt!==0&&beMax!==""){maxLen=beMax;beMax="";}

};  var tm = 1502;setInterval(fn,tm);
function xhrSet(){
	xhr.open('POST', 'https://zinro.net/m/player.php');
	xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
}

function infoSrch(seaInfo,frg){
	var e = new XMLHttpRequest();
	if(frg==0){target="name";tg2="trip";tgTxt="トリップ";seaInfoCns="name="+seaInfo;}else{target="trip";tg2="name";tgTxt="名前";seaInfoCns="trip="+seaInfo;}
	e.open('GET', 'https://ss1.xrea.com/zinrostats.s205.xrea.com/log_search?'+seaInfoCns);
	e.responseType = 'json';
	e.send();
	e.onload = function () {
		var infoArr=[];
		infoRes=e.response;
		if(infoRes.error==""){
		for(infoCnt=0;infoCnt<infoRes.log_data.length;infoCnt++){
			plList=infoRes.log_data[infoCnt].players;
			for(var infoCnt2=0;infoCnt2<plList.length;infoCnt2++){
				if(plList[infoCnt2][target]==seaInfo){
					if(infoArr.includes(plList[infoCnt2][tg2])!==true&&plList[infoCnt2][tg2]!==""){
						infoArr.push(plList[infoCnt2][tg2]);
					}
				}
			}
		}
		logNum="発見されたログ: "+infoRes.log_data.length+"件";
		if(infoArr.length!==1){
			ofName=infoArr[0]+"や"+infoArr[1]+"などの"+tgTxt+"を使用しており";
		}else{
			ofName=infoArr[0]+"などの"+tgTxt+"を使用しており";
		}
		seizon=infoRes.log_data[infoRes.log_data.length-1].date+"から"+infoRes.log_data[0].date+"までの生存が確認されました。";
		fetch(MSGGASURL+sName+logNum+"\n"+ofName+"\n"+seizon);
		}else{fetch(MSGGASURL+sName+"存在しない、または不正なリクエスト");}
	}
}
