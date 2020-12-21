/*global kakao */
import React, { useEffect } from "react";
import "../stylesheet/service.css"

export default function Map(props) {

    useEffect(() => {
        const mapscript = () => {
            let container = document.getElementById("map");
            let options = {
                center: new kakao.maps.LatLng(props.latitude, props.longitude),
                level: 5,
            };
            //map
            const map = new kakao.maps.Map(container, options);
            // 지도에 마커와 인포윈도우를 표시하는 함수입니다
            const displayMarker=(locPosition, message)=>{

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: locPosition
                });

                var iwContent = message, // 인포윈도우에 표시할 내용
                    iwRemoveable = true;

                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content : iwContent,
                    removable : iwRemoveable
                });

                // 인포윈도우를 마커위에 표시합니다
                infowindow.open(map, marker);

                // 지도 중심좌표를 접속위치로 변경합니다
                map.setCenter(locPosition);
            }

            const geocoder = new kakao.maps.services.Geocoder();

            const callback = function(result, status){
                if(status === kakao.maps.services.Status.OK){
                    let locAddress = "지역명 : " + result[0].address.address_name;
                    console.log(locAddress);
                    var locPosition = new kakao.maps.LatLng(props.latitude, props.longitude), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                        message = `<div style="padding:8px;">${locAddress}</div>`; // 인포윈도우에 표시될 내용입니다
                    // 마커와 인포윈도우를 표시합니다
                    displayMarker(locPosition, message);
                }
                else{
                    console.log(status);
                }

            };

            geocoder.coord2Address(props.longitude, props.latitude, callback);
            map.relayout();
        }

        mapscript();
    }, [props.latitude, props.longitude]);


    return <div id="map"  className={"mapShow"} style={{ width: "65vw", height: "45vh"}}></div>;

}