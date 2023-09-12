import { Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Canvas,
  Image,
  useImage,
  useTouchHandler,
  useValue,
  Text,
  useFont,
  Paint,
  Fill,
  Path,
} from "@shopify/react-native-skia";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DemoSkiaCanvasPath() {
  const image = useImage(
    "https://firebasestorage.googleapis.com/v0/b/mystory-511b4.appspot.com/o/j2FtITkWXWvEA2eeiolqNH1672904703836_trong.png?alt=media&token=c62b971d-4199-46b5-9bb0-0d0b57788428"
  );
  const { width, height } = Dimensions.get("window");
  const [isTouch, setisTouch] = useState(false);
  const [pathString, setPathString] = useState("");
  const [pathString2, setPathString2] = useState("");
  const [pathString3, setPathString3] = useState("");
  const [pathString4, setPathString4] = useState("");


  const cx = useValue(100);
  const cy = useValue(100);

  const font = useFont(require("../assets/font/Roboto-Black.ttf"), 20);
  const data = [
    "{547,111}",
    "{568,124}",
    "{557,138}",
    "{548,147}",
    "{539,155}",
    "{531,157}",
    "{524,153}",
    "{517,148}",
    "{516,134}",
    "{514,102}",
    "{524,48}",
    "{520,45}",
    "{520,43}",
    "{521,31}",
    "{510,31}",
    "{501,52}",
    "{499,44}",
    "{502,18}",
    "{523,19}",
    "{524,15}",
    "{519,9}",
    "{522,3}",
    "{543,2}",
    "{548,12}",
    "{544,14}",
    "{537,42}",
    "{533,44}",
    "{523,114}",
    "{524,147}",
    "{531,151}",
    "{537,148}",
    "{543,143}",
    "{544,141}",
    "{541,141}",
    "{548,110}",
  ];
  const data2 = [
    "{1014,215}",
    "{1018,202}",
    "{1020,193}",
    "{1043,178}",
    "{1063,167}",
    "{1064,170}",
    "{1054,188}",
    "{1017,216}"
];
    const data3= [
        "{1124,275}",
        "{1129,247}",
        "{1144,219}",
        "{1165,198}",
        "{1179,194}",
        "{1180,184}",
        "{1226,185}",
        "{1230,193}",
        "{1258,203}",
        "{1276,227}",
        "{1290,257}",
        "{1290,274}",
        "{1248,275}",
        "{1251,268}",
        "{1249,259}",
        "{1247,253}",
        "{1234,246}",
        "{1210,241}",
        "{1188,235}",
        "{1172,244}",
        "{1161,252}",
        "{1156,254}",
        "{1165,262}",
        "{1176,264}",
        "{1184,264}",
        "{1186,262}",
        "{1198,260}",
        "{1207,266}",
        "{1213,266}",
        "{1215,262}",
        "{1220,262}",
        "{1226,266}",
        "{1230,269}",
        "{1238,270}",
        "{1242,270}",
        "{1250,271}",
        "{1245,280}",
        "{1126,274}"
];

    const data4= [
        "{315,2}",
        "{431,207}",
        "{437,212}",
        "{791,210}",
        "{797,199}",
        "{800,193}",
        "{802,187}",
        "{782,2}",
        "{547,3}",
        "{548,8}",
        "{548,12}",
        "{547,14}",
        "{545,15}",
        "{537,44}",
        "{535,47}",
        "{525,94}",
        "{523,126}",
        "{524,147}",
        "{527,150}",
        "{532,150}",
        "{537,148}",
        "{540,146}",
        "{543,143}",
        "{540,140}",
        "{543,131}",
        "{545,123}",
        "{547,116}",
        "{547,112}",
        "{554,118}",
        "{570,123}",
        "{558,138}",
        "{545,153}",
        "{539,158}",
        "{535,158}",
        "{527,158}",
        "{524,158}",
        "{519,155}",
        "{515,151}",
        "{512,142}",
        "{513,107}",
        "{522,59}",
        "{522,52}",
        "{521,48}",
        "{521,41}",
        "{521,35}",
        "{511,33}",
        "{505,47}",
        "{503,49}",
        "{501,49}",
        "{498,47}",
        "{498,40}",
        "{502,17}",
        "{523,19}",
        "{521,13}",
        "{520,11}",
        "{522,2}",
        "{317,4}"
    ];

  useEffect(() => {
    setPathString(parseCoordinatesToPath(data));
    setPathString2(parseCoordinatesToPath(data2));
    setPathString3(parseCoordinatesToPath(data3));
    setPathString4(parseCoordinatesToPath(data4));

   

  }, []);

  
    function parseCoordinatesToPath(data) {
        const pathArray = data.map((coordinate) => {
          const [x, y] = coordinate.replace("{", "").replace("}", "").split(",");
          
          const newX = parseFloat(x);
          const newY = (height - parseFloat(y))  ;
          return `L ${newX} ${newY}`;
        });
      
        // Sử dụng M để di chuyển đến điểm đầu tiên và nối các đoạn Line To (L)
        const pathString = `M ${pathArray[0].substring(2)} ${pathArray.join(" ")}`;
      
        return pathString; 
    }
      
    function isPointInPath(x, y, pathData) {
        
      } 

  const touchHandler = useTouchHandler({
    onActive: ({ x, y }) => {
      cx.current = x;
      cy.current = y;
      console.log("active:" + cx.current + "-" + cy.current);

      if (isPointInPath(cx.current, cy.current, pathString4)) {
        console.log("Clicked inside the polygon");
        // Xử lý sự kiện khi click vào path
      }


      if (
        cx.current >= 380 &&
        cx.current <= 480 &&
        cy.current >= 250 &&
        cy.current <= 350
      ) {
        setisTouch(false);
        setisTouch(true);
        setTimeout(() => {
          setisTouch(false);
        }, 3000);
      }
    },
  });

    const transform = [{scale:0.49},{translateY: height}];


  return (
    <View>

    
    <Canvas style={{flex:1 }} onTouch={touchHandler}>
        
      <Image
        image={image}
        fit="fill"
        width={width}
        height={height}
      />

      <Text
        x={width / 2 - 100}
        y={height / 2 - 150}
        text="make a Salad bowll"
        font={font}
        color="red"
      ></Text>

      {isTouch && (
        <Text
          x={cx.current - 60}
          y={cy.current - 30}
          text="Cabages"
          font={font}
          color="red"
        >
          <Paint color="blue"></Paint>
        </Text>
      )}
        
        
        <Path path={pathString2} color="blue" transform={transform}/>
        <Path path={pathString3} color="blue" transform={transform}/>
        <Path path={pathString4} color="red" transform={transform}/>
    </Canvas>

    <Canvas  style={{width:200, height:200, backgroundColor:'red' }}>
        <Path path={pathString} color="blue" transform={transform}/>
    </Canvas>

    </View>
  );
}

const styles = StyleSheet.create({});
