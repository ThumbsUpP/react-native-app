import React from "react";
import DefaultInput from '../UI/DefaultInput/DefaultInput';


const placeInput = (props) => {
  return (
    <DefaultInput
      placeholder="Place name"
      value={props.placeName}
      onChangeText={props.onChangeText}
      style={props.style}
    />)
}

export default placeInput;
