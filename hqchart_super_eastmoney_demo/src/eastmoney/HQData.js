/*
   Copyright (c) 2018 jones
 
    http://www.apache.org/licenses/LICENSE-2.0

   开源项目 https://github.com/jones2000/HQChart
 
   jones_2000@163.com

   行情数据对接,使用东方财富网页数据做为案例的测试数据源
*/

import $, { hasData } from 'jquery'
import HQChart from 'hqchart'

//源码调试用
//import Chart from '../../jscommon/umychart.vue/umychart.vue.js'
//var HQChart={ Chart:Chart };

function HQData()  { }

HQData.Explain="东财财富网接口";


HQData.SetMinuteChartCoordinate=function()
{
    HQChart.Chart.MARKET_SUFFIX_NAME.IsShowAvPrice=(upperSymbol)=>{ return HQData.IsShowAvPrice(upperSymbol); }

    //美股分时图坐标
    HQChart.Chart.JSChart.GetMinuteTimeStringData().CreateUSAData=()=>{ return HQData.CreateUSAData(HQChart.Chart.JSChart.GetMinuteTimeStringData()); }  //替换交易时间段
    HQChart.Chart.JSChart.GetMinuteCoordinateData().GetUSAData=(upperSymbol,width)=> { return HQData.GetUSAData(upperSymbol,width); }    	//替换X轴刻度信息

    //A股分时图坐标
    HQChart.Chart.JSChart.GetMinuteTimeStringData().CreateSHSZData=()=>{ return HQData.CreateSHSZData(HQChart.Chart.JSChart.GetMinuteTimeStringData()); }  //替换交易时间段
    HQChart.Chart.JSChart.GetMinuteCoordinateData().GetSHSZData=(upperSymbol,width)=> { return HQData.GetSHSZData(upperSymbol,width); }    	//替换X轴刻度信息

    //港股分时图坐标
    HQChart.Chart.JSChart.GetMinuteTimeStringData().CreateHKData=()=>{ return HQData.CreateHKData(HQChart.Chart.JSChart.GetMinuteTimeStringData()); }   //替换交易时间段
    HQChart.Chart.JSChart.GetMinuteCoordinateData().GetHKData=(upperSymbol,width)=> { return HQData.GetHKData(upperSymbol,width); }    	//替换X轴刻度信息

    //外汇分时图坐标
    HQChart.Chart.JSChart.GetMinuteTimeStringData().CreateForeignExchangeData=()=>{ return HQData.CreateForeignExchangeData(HQChart.Chart.JSChart.GetMinuteTimeStringData()); }  //替换交易时间段
    HQChart.Chart.JSChart.GetMinuteCoordinateData().GetForeignExchangeData=(upperSymbol,width)=> { return HQData.GetForeignExchangeData(upperSymbol,width); }    	//替换X轴刻度信息

    //期货
    var chinaFutrues=HQChart.Chart.JSChart.GetChinaFuturesTimeData();
    chinaFutrues.AddNewFutures({ Suffix:'.SHF', Symbol:"WR", Time:9, Decimal:2, Name:'线材' }); //obj= { Suffix:后缀, Symbol:品种代码, Time:交易时间段, Decimal:小数位数, Name:名字 }
    chinaFutrues.AddNewFutures({ Suffix:'.DCE', Symbol:"BB", Time:9, Decimal:2, Name:'胶合板' });
    chinaFutrues.AddNewFutures({ Suffix:'.DCE', Symbol:"JD", Time:9, Decimal:2, Name:'鸡蛋' });
    chinaFutrues.AddNewFutures({ Suffix:'.DCE', Symbol:"LH", Time:9, Decimal:2, Name:'生猪' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"WH", Time:9, Decimal:0, Name:'强麦' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"PM", Time:9, Decimal:0, Name:'普麦' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"RI", Time:9, Decimal:0, Name:'早籼稻' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"RS", Time:9, Decimal:0, Name:'菜籽' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"JR", Time:9, Decimal:0, Name:'粳稻' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"LR", Time:9, Decimal:0, Name:'晚籼稻' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"LR", Time:9, Decimal:0, Name:'晚籼稻' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"SM", Time:9, Decimal:0, Name:'锰硅' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"SF", Time:9, Decimal:0, Name:'硅铁' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"AP", Time:9, Decimal:0, Name:'苹果' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"CJ", Time:9, Decimal:0, Name:'红枣' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"UR", Time:9, Decimal:0, Name:'尿素' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"PK", Time:9, Decimal:0, Name:'花生' });

    //芝加哥期货交易所
    var futrues=HQChart.Chart.JSChart.GetInternalTimeData("CBOTTimeData");
    futrues.AddNewFutures({Symbol:"ZW", Time:3, Decimal:2, Name:'小麦' });
    futrues.AddNewFutures({Symbol:"XW", Time:4, Decimal:2, Name:'迷你小麦' });
    futrues.AddNewFutures({Symbol:"ZC", Time:3, Decimal:2, Name:'玉米' });
    futrues.AddNewFutures({Symbol:"XC", Time:4, Decimal:2, Name:'迷你玉米' });
    futrues.AddNewFutures({Symbol:"ZS", Time:3, Decimal:2, Name:'大豆' });
    futrues.AddNewFutures({Symbol:"XK", Time:4, Decimal:2, Name:'迷你大豆' });
    futrues.AddNewFutures({Symbol:"ZL", Time:3, Decimal:2, Name:'豆油' });
    futrues.AddNewFutures({Symbol:"ZM", Time:3, Decimal:2, Name:'豆粕' });
    futrues.AddNewFutures({Symbol:"ZO", Time:3, Decimal:2, Name:'燕麦' });
    futrues.AddNewFutures({Symbol:"ZR", Time:3, Decimal:2, Name:'稻谷' });
    futrues.AddNewFutures({Symbol:"ZL", Time:3, Decimal:2, Name:'豆油' });
    futrues.AddNewFutures({Symbol:"NQ", Time:5, Decimal:2, Name:'小型纳指' });
    futrues.AddNewFutures({Symbol:"ES", Time:5, Decimal:2, Name:'小型标普' });
    futrues.AddNewFutures({Symbol:"YM", Time:5, Decimal:0, Name:'小型道指' });

    //美国洲际交易所
    var futrues=HQChart.Chart.JSChart.GetInternalTimeData("IPETimeData");
    var lIndex=futrues.TIME_SPLIT.length;
    futrues.TIME_SPLIT[lIndex]=HQData.GetCustomTradeTimeData("IPE_G");
    futrues.TIME_SPLIT2[lIndex]=HQData.GetCustomTradeTimeData("IPE_G_2");
    futrues.AddNewFutures({Symbol:"G", Time:lIndex, Decimal:0, Name:'低硫柴油' });
}


HQData.NetworkFilter=function(data, callback)
{
    console.log(`[HQData::NetworkFilter] ${HQData.Explain}`, data);

    switch(data.Name) 
    {
        case 'MinuteChartContainer::RequestMinuteData': //分时图数据对接
            HQData.RequestMinuteData(data, callback);
            break;
        case "MinuteChartContainer::RequestHistoryMinuteData":
            HQData.RequestMinuteDaysData(data, callback);
            break;
    }
}

HQData.RequestMinuteData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol[0]; //请求的股票代码
    var dayCount=data.Request.Data.daycount;
    console.log(`[HQData::RequestMinuteData] Symbol=${symbol}`);
    var obj=HQData.GetMinuteApiUrl(symbol,1);

    $.ajax(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvMinuteData(recvData, callback, { Data:data, Obj:obj });                 
        }
    });

}

HQData.RecvMinuteData=function(recvData, callback, option)
{
    var data=recvData.data;

    var stock={symbol:option.Obj.Symbol, minute:[] };
    stock.name=data.name;
    stock.yclose=data.preClose;

    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var isStockA=HQData.IsSHSZ(symbolUpper);
    var isChinaFutrues=HQData.IsChinaFutures(symbolUpper);
    var isLME=HQChart.Chart.MARKET_SUFFIX_NAME.IsLME(symbolUpper);  //伦敦金属交易所
    if (isChinaFutrues) stock.yclearing=data.preSettlement; //期货昨结算价

    for(var i=0;i<data.trends.length; ++i)
    {
        var strItem=data.trends[i];
        var item=strItem.split(',');
        var today = new Date(Date.parse(item[0]));  
        var date=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
        var time=today.getHours()*100+today.getMinutes();

        var stockItem=
        { 
            date:date,
            time:time,
            open:parseFloat(item[1]),
            high:parseFloat(item[2]),
            low:parseFloat(item[3]),
            price:parseFloat(item[4]), 
            vol:parseFloat(item[5]),
            amount:parseFloat(item[6]),
            avprice:parseFloat(item[7]),
        }

        if (isStockA) stockItem.vol*=100;
        if (isLME) stockItem.avprice=null;

        stock.date=date;
        stock.minute.push(stockItem);
    }

    var hqchartData={stock:[stock], code:0 };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteDaysData] hqchartData ", hqchartData)
		callback(hqchartData);
    }
}

HQData.RequestMinuteDaysData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol; //请求的股票代码
    var dayCount=data.Request.Data.daycount;
    var symbolUpper=symbol.toUpperCase();
    console.log(`[HQData::RequestMinuteDaysData] Symbol=${symbol}`);
    var obj=HQData.GetMinuteApiUrl(symbol,dayCount);

    $.ajax(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSHFE(symbolUpper) || HQChart.Chart.MARKET_SUFFIX_NAME.IsDCE(symbolUpper) || 
                HQChart.Chart.MARKET_SUFFIX_NAME.IsCZCE(symbolUpper) || HQChart.Chart.MARKET_SUFFIX_NAME.IsCFFEX(symbolUpper))
                HQData.RecvMinuteDaysDataV2(recvData, callback, { Data:data, Obj:obj });      
            else 
                HQData.RecvMinuteDaysData(recvData, callback, { Data:data, Obj:obj });                 
        }
    });
}

HQData.RecvMinuteDaysData=function(recvData, callback, option)
{
    var data=recvData.data;
    var aryDayData=[];
    var itemDay=null;
    var yClose=data.preClose;
    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var isStockA=HQData.IsSHSZ(symbolUpper);

    var xDatetime=HQChart.Chart.JSChart.GetMinuteTimeStringData().GetTimeData(symbol);
    var firstTime=xDatetime[0]; //第1个数据的时间
    var minuteCount=xDatetime.length;
    var i=0;
    for(i=0;i<data.trends.length;++i)
    {
        var strItem=data.trends[i];
        var item=strItem.split(',');
        var today = new Date(Date.parse(item[0]));  
        var date=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
        var time=today.getHours()*100+today.getMinutes();
        if (time==firstTime) break;
    }
    
    for(var j=0;i<data.trends.length; ++i, ++j)
    {
        var strItem=data.trends[i];
        var item=strItem.split(',');
        var today = new Date(Date.parse(item[0]));  
        var date=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
        var time=today.getHours()*100+today.getMinutes();

        if (j%minuteCount==0)
        {
            if (itemDay && itemDay.minute.length>0) aryDayData.push(itemDay);
            itemDay={ minute:[], date:date, yclose: yClose };
        }

        var price=parseFloat(item[4]);
        var stockItem=
        { 
            date:date,
            time:time,
            open:price,
            high:price,
            low:price,
            price:price, 
            amount:parseFloat(item[6]),
            vol:parseFloat(item[5]),
            avprice:parseFloat(item[7]),
        }

        if (isStockA) stockItem.vol*=100;

        itemDay.minute.push([stockItem.time, stockItem.open, stockItem.high, stockItem.low, stockItem.price, stockItem.vol, stockItem.amount, stockItem.avprice, stockItem.date]);
    }

    if (itemDay && itemDay.minute.length>0) aryDayData.push(itemDay);

    aryDayData=aryDayData.reverse();

    var hqchartData={ symbol:option.Obj.Symbol, name:data.name, data:aryDayData, code:0 };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteDaysData] hqchartData ", hqchartData)
		callback(hqchartData);
    }
}

//期货模式
HQData.RecvMinuteDaysDataV2=function(recvData, callback, option)
{
    var data=recvData.data;
    var aryDayData=[];
    var yClose=data.preClose;
    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var yClearing=data.preSettlement; //期货昨结算价

    var xDatetime=HQChart.Chart.JSChart.GetMinuteTimeStringData().GetTimeData(symbol);
    var endTime=xDatetime[xDatetime.length-1]; //最后个数据的时间
    var minuteCount=xDatetime.length;
    
    var itemDay={ minute:[], date:null, yclose: yClose, yclearing:yClearing };
    for(var i=0;i<data.trends.length; ++i)
    {
        var strItem=data.trends[i];
        var item=strItem.split(',');
        var today = new Date(Date.parse(item[0]));  
        var date=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
        var time=today.getHours()*100+today.getMinutes();

        var price=parseFloat(item[4]);
        var stockItem=
        { 
            date:date,
            time:time,
            open:price,
            high:price,
            low:price,
            price:price, 
            amount:parseFloat(item[6]),
            vol:parseFloat(item[5]),
            avprice:parseFloat(item[7]),
        }

        itemDay.date=date;
        itemDay.minute.push([stockItem.time, stockItem.open, stockItem.high, stockItem.low, stockItem.price, stockItem.vol, stockItem.amount, stockItem.avprice, stockItem.date]);

        if (time==endTime)
        {
            if (itemDay && itemDay.minute.length>0) aryDayData.push(itemDay);
            itemDay={ minute:[], date:null, yclose: yClose, yclearing:yClearing };
        }
    }

    if (itemDay && itemDay.minute.length>0) aryDayData.push(itemDay);

    var preClose=null, preAvprice=null, preDate=null;
    for(var i=0;i<aryDayData.length-1;++i)
    {
        var itemDay=aryDayData[i];
        var newMinuteData=HQData.CorrectMinuteData(itemDay.minute, xDatetime);
        if (newMinuteData)
        {
            for(var j=0;j<newMinuteData.length;++j)
            {
                var item=newMinuteData[j];
                if (item.length==1)
                {
                    item[1]= item[2]= item[3]=item[4]=preClose;
                    item[5]=item[6]=0;
                    item[7]=preAvprice;
                    item[8]=preDate;
                }
                else
                {
                    preClose=item[4];
                    preAvprice=item[7];
                    preDate=item[8];
                }
            }
            itemDay.minute=newMinuteData;
        } 
        else
        {
            var item=itemDay.minute[itemDay.minute.length-1];
            preClose=item[4];
            preAvprice=item[7];
            preDate=item[8];
        }
    }

    aryDayData=aryDayData.reverse();

    var hqchartData={ symbol:option.Obj.Symbol, name:data.name, data:aryDayData, code:0 };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteDaysData] hqchartData ", hqchartData)
		callback(hqchartData);
    }
}

HQData.CorrectMinuteData=function(minuteData, xDatetime)
{
    if (minuteData.length==xDatetime.length) return null;

    var mapData=new Map();
    for(var i=0;i<xDatetime.length; ++i)
    {
        var item=xDatetime[i];
        mapData.set(item, { Index:i, Time:item, Data:null });
    }

    for(var i=0;i<minuteData.length;++i)
    {
        var item=minuteData[i];
        var time=item[0];

        var findItem=mapData.get(time);
        findItem.Data=item;
    }

    var newMinuteData=[];
    for(var item of mapData)
    {
        var value=item[1];

        if (value.Data) newMinuteData[value.Index]=value.Data;
        else newMinuteData[value.Index]=[value.Time];
    }

    return newMinuteData;
}


HQData.GetInternalSymbol=function(symbol)   //HQChart内置代码转成东方财富代码
{
    var aryData=symbol.split(".");

    var symbolUpper=symbol.toUpperCase()
    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsUSA(symbolUpper))    //美股
    {
        var market= 105;
        var set106Market=new Set(
            ["RENN", "DIDI","BABA","ZH"]
        );
    
        var set100Market=new Set
        (
            ["DJIA", "SPX", "NDX"]
        )
    
        if (set106Market.has(aryData[0])) market=106;
        else if (set100Market.has(aryData[0])) market=100;
    
        return { Market:market, Symbol:aryData[0].toUpperCase() };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSZ(symbolUpper))
    {
        return { Market:0, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSH(symbolUpper))
    {
        return { Market:1, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsHK(symbolUpper))    //港股
    {
        var market=116;

        var set100Market=new Set
        (
            ["HSI"]
        );
        if (set100Market.has(aryData[0])) market=100;

        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsForeignExchange(symbolUpper))   //外汇
    {
        var market=119;

        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSHFE(symbolUpper))
    {
        var market=113;

        //上期能源
        if (symbolUpper.indexOf("SC")==0 || symbolUpper.indexOf("NR")==0 || 
            symbolUpper.indexOf("LU")==0 ||symbolUpper.indexOf("BC")==0) 
            market=142;

        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsDCE(symbolUpper))
    {
        var market=114;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsCZCE(symbolUpper))
    {
        var market=115;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsCFFEX(symbolUpper))
    {
        var market=8;
        var arySymbol=aryData[0].split('_');
        return { Market:market, Symbol:arySymbol[1] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsCBOT(symbolUpper))
    {
        var market=103;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsNYMEX(symbolUpper))
    {
        var market=102;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsCOMEX(symbolUpper))
    {
        var market=101;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsNYBOT(symbolUpper))
    {
        var market=108;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsLME(symbolUpper))
    {
        var market=109;
        var arySymbol=aryData[0].split('_');
        return { Market:market, Symbol:arySymbol[1] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsTOCOM(symbolUpper))
    {
        var market=111;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsIPE(symbolUpper))
    {
        var market=112;
        return { Market:market, Symbol:aryData[0] };
    }
}

HQData.GetMinuteApiUrl=function(symbol, dayCount)
{
    var internalSymbol=HQData.GetInternalSymbol(symbol);
    //var url=`http://push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&secid=${internalSymbol.Market}.${internalSymbol.Symbol}&ndays=1&iscr=0&iscca=0`
    var url=`/eastmoney/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&secid=${internalSymbol.Market}.${internalSymbol.Symbol}&ndays=${dayCount}&iscr=0&iscca=0`

    return { Url:url, Symbol:symbol, InternalSymbol:internalSymbol, DayCount:dayCount };
}

HQData.IsSHSZ=function(symbol)  //是否是A股
{
    return HQChart.Chart.MARKET_SUFFIX_NAME.IsSHSZ(symbol);
}

HQData.IsChinaFutures=function(symbol)  //国内期货
{
    return HQChart.Chart.MARKET_SUFFIX_NAME.IsChinaFutures(symbol);
}

HQData.IsShowAvPrice=function(upperSymbol)   //是否显示均价
{
    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsLME(upperSymbol)) return false;

    return true;
}

HQData.IsShowVolChart=function(upperSymbol) //是否显示第2个成交量图
{
    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsForeignExchange(upperSymbol)) return false;

    return true;
}


///////////////////////////////////////////////////////////////////////////////////////////
//  
//  美国洲际交易所 重柴油
//
HQData.GetCustomTradeTimeData=function(key)
{
    if (key=="IPE_G")   //美国洲际交易所 重柴油 数据从7：50开始,是盘前数据吗????
    {
        //7:50-6:00
        var data=
        {
            Name:'7:50-6:00',
            Data:
            [
                { Start: 750, End: 2359 },
                { Start: 0, End: 600 },
            ],
            Coordinate:
            {
                Full://完整模式
                [
                    { Value: 800, Text: '8:00' },
                    { Value: 1000, Text: '10:00' },
                    { Value: 1200, Text: '12:00' },
                    { Value: 1400, Text: '14:00' },
                    { Value: 1600, Text: '16:00' },
                    { Value: 1800, Text: '18:00' },
                    { Value: 2000, Text: '20:00' },
                    { Value: 2200, Text: '22:00' },
                    { Value: 0, Text: '0:00' },
                    { Value: 200, Text: '2:00' },
                    { Value: 400, Text: '4:00' },
                    { Value: 600, Text: '6:00' },
                ],
                Simple: //简洁模式
                [
                    { Value: 800, Text: '8:00' },
                    { Value: 1200, Text: '12:00' },
                    { Value: 1600, Text: '16:00' },
                    { Value: 2000, Text: '20:00' },
                    { Value: 0, Text: '0:00' },
                    { Value: 400, Text: '4:00' },
                    { Value: 600, Text: '6:00' },
                ],
                Min:   //最小模式  
                [
                    { Value: 800, Text: '8:00' },
                    { Value: 2000, Text: '20:00' },
                    { Value: 600, Text: '6:00' }
                ]
            }
        };

        return data;
    }
    else if (key=="IPE_G_2")
    {
        var data=//ID=0 08:50-07:00
        {
            Name:'08:50-07:00',
            Data:
            [
                { Start: 850, End: 2359 },
                { Start: 0, End: 700 },
            ],
            Coordinate:
            {
                Full://完整模式
                [
                    { Value: 900, Text: '9:00' },
                    { Value: 1100, Text: '11:00' },
                    { Value: 1300, Text: '13:00' },
                    { Value: 1500, Text: '15:00' },
                    { Value: 1700, Text: '17:00' },
                    { Value: 1900, Text: '19:00' },
                    { Value: 2100, Text: '21:00' },
                    { Value: 2300, Text: '23:00' },
                    { Value: 1, Text: '1:00' },
                    { Value: 300, Text: '3:00' },
                    { Value: 500, Text: '5:00' },
                    { Value: 700, Text: '7:00' }
                ],
                Simple: //简洁模式
                [
                    { Value: 900, Text: '9:00' },
                    { Value: 1300, Text: '13:00' },
                    { Value: 1700, Text: '17:00' },
                    { Value: 2100, Text: '21:00' },
                    { Value: 1, Text: '1:00' },
                    { Value: 500, Text: '5:00' },
                    { Value: 700, Text: '7:00' }
                ],
                Min:   //最小模式  
                [
                    { Value: 900, Text: '9:00' },
                    { Value: 2100, Text: '21:00' },
                    { Value: 700, Text: '7:00' }
                ]
            }
        };

        return data;
    }
}



////////////////////////////////////////////////////////////////////////////
// 美股走势图X轴坐标
//
////////////////////////////////////////////////////////////////////////////
HQData.CreateUSAData=function(minuteStringData)
{
    const TIME_SPLIT =
    [
        { Start: 2130, End: 2359 },
        { Start: 0, End: 400 }
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}

HQData.GetUSAData=function(upperSymbol,width)
{
    const SHZE_MINUTE_X_COORDINATE =
    {
        Full:   //完整模式
        [
            [0, 0, "rgb(200,200,200)", "21:30"],
            [30, 1, "RGB(200,200,200)", "22:00"],
            [60, 0, "RGB(200,200,200)", "22:30"],
            [90, 1, "RGB(200,200,200)", "23:00"],
            [120, 0, "RGB(200,200,200)", "23:30"],
            [150, 1, "RGB(200,200,200)", "00:00"],
            [180, 0, "RGB(200,200,200)", "00:30"],
            [210, 1, "RGB(200,200,200)", "01:00"],
            [240, 0, "RGB(200,200,200)", "01:30"], 
            [270, 1, "RGB(200,200,200)", "02:00"], 
            [300, 0, "RGB(200,200,200)", "02:30"], 
            [330, 1, "RGB(200,200,200)", "03:00"], 
            [360, 0, "RGB(200,200,200)", "03:30"], 
            [390, 1, "RGB(200,200,200)", "04:00"], 
        ],
        Simple: //简洁模式
        [
            [0, 0, "rgb(200,200,200)", "21:30"],
            [90, 1, "RGB(200,200,200)", "23:00"],
            [150, 1, "RGB(200,200,200)", "00:00"],
            [270, 1, "RGB(200,200,200)", "02:00"], 
            [390, 1, "RGB(200,200,200)", "04:00"], 
        ],
        Min:   //最小模式     
        [
            [0, 0, "rgb(200,200,200)", "21:30"],
            [210, 1, "RGB(200,200,200)", "01:00"],
            [390, 1, "RGB(200,200,200)", "04:00"], 
        ],

        Count: 391,         //!! 一共的分钟数据个数，不要填错了
        MiddleCount: 195,   // Count/2 就可以。

        GetData: function (width) 
        {
            if (width < 200) return this.Min;
            else if (width < 400) return this.Simple;

            return this.Full;
        }
    };

    return SHZE_MINUTE_X_COORDINATE;
}


////////////////////////////////////////////////////////////////////////////
// A股走势图X轴坐标
//
///////////////////////////////////////////////////////////////////////////
HQData.CreateSHSZData=function(minuteStringData)
{
    const TIME_SPLIT =
    [
        { Start: 930, End: 1130 },
        { Start: 1301, End: 1500 }
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}


HQData.GetSHSZData=function(upperSymbol,width)
{
    const SHZE_MINUTE_X_COORDINATE =
    {
        Full:   //完整模式
        [
            [0, 0, "rgb(200,200,200)", "09:30"],
            [31, 0, "RGB(200,200,200)", "10:00"],
            [61, 0, "RGB(200,200,200)", "10:30"],
            [91, 0, "RGB(200,200,200)", "11:00"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [150, 0, "RGB(200,200,200)", "13:30"],
            [180, 0, "RGB(200,200,200)", "14:00"],
            [210, 0, "RGB(200,200,200)", "14:30"],
            [240, 1, "RGB(200,200,200)", "15:00"], // 15:00
        ],
        Simple: //简洁模式
        [
            [0, 0, "rgb(200,200,200)", "09:30"],
            [61, 0, "RGB(200,200,200)", "10:30"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [180, 0, "RGB(200,200,200)", "14:00"],
            [240, 1, "RGB(200,200,200)", "15:00"]
        ],
        Min:   //最小模式     
        [
            [0, 0, "rgb(200,200,200)", "09:30"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [240, 1, "RGB(200,200,200)", "15:00"]
        ],

        Count: 241,         //!! 一共的分钟数据个数，不要填错了
        MiddleCount: 121,   // Count/2 就可以。

        GetData: function (width) 
        {
            if (width < 200) return this.Min;
            else if (width < 400) return this.Simple;

            return this.Full;
        }
    };

    return SHZE_MINUTE_X_COORDINATE;
}

///////////////////////////////////////////////////////////////////////////////////////
// 港股走势图X轴坐标
//
///////////////////////////////////////////////////////////////////////////////////////
HQData.CreateHKData=function(minuteStringData)
{
    const TIME_SPLIT =
    [
        { Start: 930, End: 1200 },
        { Start: 1301, End: 1600 }
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}

HQData.GetHKData=function(upperSymbol,width)
{
    const HK_MINUTE_X_COORDINATE =
    {
        Full:   //完整模式
        [
            [0, 1, "RGB(200,200,200)", "09:30"],
            [30, 0, "RGB(200,200,200)", "10:00"],
            [60, 1, "RGB(200,200,200)", "10:30"],
            [90, 0, "RGB(200,200,200)", "11:00"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [151, 0, "RGB(200,200,200)", "13:00"],
            [181, 1, "RGB(200,200,200)", "13:30"],
            [211, 0, "RGB(200,200,200)", "14:00"],
            [241, 1, "RGB(200,200,200)", "14:30"],
            [271, 0, "RGB(200,200,200)", "15:00"],
            [301, 1, "RGB(200,200,200)", "15:30"],
            [331, 1, "RGB(200,200,200)", "16:00"]
        ],
        Simple: //简洁模式
        [
            [0, 1, "RGB(200,200,200)", "09:30"],
            [60, 1, "RGB(200,200,200)", "10:30"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [211, 0, "RGB(200,200,200)", "14:00"],
            [271, 0, "RGB(200,200,200)", "15:00"],
            [331, 1, "RGB(200,200,200)", "16:00"]
        ],
        Min:   //最小模式     
        [
            [0, 1, "RGB(200,200,200)", "09:30"],
            [151, 0, "RGB(200,200,200)", "13:00"],
            [331, 1, "RGB(200,200,200)", "16:00"]
        ],

        Count: 331,
        MiddleCount: 150,

        GetData: function (width) 
        {
            if (width < 200) return this.Min;
            else if (width < 450) return this.Simple;

            return this.Full;
        }
    };
    return HK_MINUTE_X_COORDINATE;
}

////////////////////////////////////////////////////////////////////////////////////////
//  外汇走势图X轴坐标
//
////////////////////////////////////////////////////////////////////////////////////////
HQData.CreateForeignExchangeData=function(minuteStringData)
{
    //外汇 5:00 - 4:59
    const TIME_SPLIT=           
    [
        { Start:500, End:2359 },
        { Start:0,  End:459 },
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}

HQData.GetForeignExchangeData=function(upperSymbol,width)
{
    const FOREX_MINUTE_X_COORDINATE=
    {
        Full:   //完整模式
        [
            [0, 1, "RGB(200,200,200)", "05:00"],
            [120, 1, "RGB(200,200,200)", "07:00"],
            [240, 1, "RGB(200,200,200)", "09:00"],
            [360, 1, "RGB(200,200,200)", "11:00"],
            [480, 0, "RGB(200,200,200)", "13:00"],
            [600, 1, "RGB(200,200,200)", "15:00"],
            [720, 1, "RGB(200,200,200)", "17:00"],
            [840, 1, "RGB(200,200,200)", "19:00"],
            [960, 1, "RGB(200,200,200)", "21:00"],
            [1080, 1, "RGB(200,200,200)", "23:00"],
            [1200, 1, "RGB(200,200,200)", "01:00"],
            [1320, 1, "RGB(200,200,200)", "03:00"],
            [1439, 1, "RGB(200,200,200)", "04:59"],
        ],
        Simple: //简洁模式
        [
            [0, 1, "RGB(200,200,200)", "06:00"],
            [240, 1, "RGB(200,200,200)", "10:00"],
            [480, 0, "RGB(200,200,200)", "14:00"],
            [720, 1, "RGB(200,200,200)", "18:00"],
            [960, 1, "RGB(200,200,200)", "22:00"],
            [1200, 1, "RGB(200,200,200)", "02:00"],
        ],
        Min:   //最小模式     
        [
            [0, 1, "RGB(200,200,200)", "06:00"],
            [480, 0, "RGB(200,200,200)", "14:00"],
            [960, 1, "RGB(200,200,200)", "22:00"],
        ],

        Count: 1440,
        MiddleCount: 600,

        GetData: function (width) 
        {
            if (width < 200) return this.Min;
            else if (width < 450) return this.Simple;

            return this.Full;
        }
    } 

    return FOREX_MINUTE_X_COORDINATE;
}

export default
{
	HQData:HQData
}
