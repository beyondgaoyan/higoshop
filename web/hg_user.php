<?php

/**
* 海关接口-用户相关
* API-进口订单
*/

define('IN_ECS', true);

require(dirname(__FILE__) . '/includes/init.php');
//发送请求，获得接口新增修改数据

$time = date("Y-m-d H:i:s");
            $xml_data = '<Message><Body>';
            $xml_data.="<OrderFrom>0000</OrderFrom>";
            $xml_data.="<Idnum>130402198204092411</Idnum>";
            $xml_data.="<Name>高岩</Name>";
            $xml_data.="<Account>haigoutest</Account>";
            $xml_data.="<Phone>18611706483</Phone>";
            $xml_data.="<Email>1140608610@qq.com</Email>";
            $xml_data.="</Body></Message>";
            $url_get = '';
            $url_get .="userid=higoshop&timestamp=".urlencode($time);
            $sign = "higoshop68848eaf-a2ff-42ab-8c1a-5ed96d65af65".$time;
            
            $url_get .="&sign=".md5($sign);
            $url_get .="&xmlstr=".urlencode($xml_data);
            $url = 'http://i.trainer.kjb2c.com/msg/logisticsfirm.do?'.$url_get;
//echo $url;
            $header[] = "Content-type:text/xml; charset=utf-8";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_MUTE, 1);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
            curl_setopt($ch, CURLOPT_HEADER, 0);
            

			
			
            $resp = curl_exec($ch);
/*
            if (curl_errno($ch)) {
                helper::datalog('CURL失败原因:' . curl_errno($ch) . " 时间:" . $now_time, 'cron_addtruckcodeforztolog_');
            }
*/
            curl_close($ch);
           
            $result = simplexml_load_string($resp);
			echo "<pre>";
            print_r($result);
?>