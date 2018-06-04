/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from "react-native";

const Dimensions = require("Dimensions");
const {width, height} = Dimensions.get("window");

//商品展示区域的宽高
const cartWidth = width * 0.9,
      cartHeight = height * 0.8;

const dataArr = require("./localData/data.json");

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listArr: []
        }
    }

    render() {
        return (
            <View style={styles.container}>

                {/*上面的按钮视图*/}
                <View style={styles.topStyle}>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={() => this._addOne()}
                    >
                        <Text style={styles.btnFontStyle}>添加</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btnStyle, {backgroundColor: "red"}]}
                        onPress={() => this._delOne()}
                    >
                        <Text style={styles.btnFontStyle}>删除</Text>
                    </TouchableOpacity>
                </View>

                {/*下面的展示视图*/}
                <View style={styles.bottomStyle}>
                    {this.state.listArr}
                </View>
            </View>
        )
    }
    
    _addOne() {
        const index = this.state.listArr.length;
        if(index > dataArr.length - 1) {
            alert("不要再败家了!!!");
            return

        }
        // 确定这个商品的行列
        const col = parseInt(index % this.props.baseNum);
        const row = parseInt(index / this.props.baseNum);

        // 确定每个商品的位置
        const leftSpace = (this.props.goodWidth + this.props.spaceX) * col;
        const topSpace = (this.props.goodHeight + this.props.spaceY) * row;

        let inner = (
            <View
                key={index}
                style={{
                        position: "absolute",
                        left: leftSpace,
                        top: topSpace,
                        justifyContent: "center",
                        alignItems: "center"
                       }}
            >
                <Image source={{uri: dataArr[index].icon}}
                       style={{width:this.props.goodWidth * 0.8, height:this.props.goodHeight * 0.8}}
                       resizeMode="contain"
                />
                <Text>{dataArr[index].name}</Text>
            </View>
        );

        this.state.listArr.push(inner);
        this.setState({
            listArr: this.state.listArr
        })
    }

    _delOne() {
        const index = this.state.listArr.length;
        if(index <= 0){
            alert("空空如也了已经~");
            return;
        }
        this.state.listArr.pop();
        //只要调用setState,就会重新调用render函数,从而达到视图的更新
        this.setState({
            listArr: this.state.listArr
        })
    }
}
App.defaultProps = {
    //目标行数或者列数
    baseNum: 3,
    //商品间的距离
    spaceX: parseInt(cartWidth * 0.05),
    spaceY: parseInt(cartHeight * 0.05),
    //商品所占区域
    goodWidth: parseInt(cartWidth * 0.9 / 3),
    goodHeight: parseInt(cartHeight * 0.9 / 3)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "skyblue"
    },
    topStyle: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 30

    },
    btnStyle: {
        width: 120,
        height: 40,
        backgroundColor: "green",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    btnFontStyle: {
        fontSize: 18,
        color: "#fff"
    },
    bottomStyle: {
        backgroundColor: "#fff",
        width: cartWidth,
        height: cartHeight,
        marginLeft: width * 0.05

    }
});

