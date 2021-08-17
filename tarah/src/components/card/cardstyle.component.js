import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { CustomFontFamily } from "../styles/styles.component";
import { TouchableOpacity } from "react-native";

export const StyledCardImage = styled.Image`
  width: 20px;
  height: 20px;
`;

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
  padding-bottom: 10px;
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const StyledCardCover = styled(Card.Cover)`
  height: 220px;
  background-color: green;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 35px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 35px;
`;

export const StyledCardTitle = styled.Text`
  font-size: 20px;
  font-family: ${CustomFontFamily.fouth};
`;

export const SectionColumn = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-left: 8px;
  top: 3px;
`;

export const StyledProfileTitle = styled.Text`
  font-size: 22px;
  font-family: ${CustomFontFamily.eight};
`;

export const StyledProfileName = styled.Text`
  font-size: 15;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledEditProfile = styled.Text`
  font-size: 24px;
  font-family: ${CustomFontFamily.seven};
  padding-left: 10px;
`;

export const StyledProfilePostFollow = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const StyledCardLikes = styled.Text`
  font-size: 17px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardComments = styled.Text`
  font-size: 15px;
  color: gray;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardDateTime = styled.Text`
  font-size: 12px;
  color: gray;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardSubTitle = styled.Text`
  font-size: 15px;
  font-family: ${CustomFontFamily.first};
  color: black;
`;

export const StyledCardDesc = styled.Text`
  font-size: 10px;
  font-family: ${CustomFontFamily.third};
  color: black;
`;

export const StyledCardAmount = styled.Text`
  color: black;
  font-size: 20px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardOfferAmount = styled.Text`
  color: black;
  font-size: 15px;
  opacity:0.5
  padding-left:10px;
  text-decoration: line-through;
`;

export const StyledCardOfferPercentage = styled.Text`
  color: green;
  font-size: 15px;
  padding-left: 10px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardProductAvailable = styled.Text`
  color: green;
  font-size: 15px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardProductOutOfStock = styled.Text`
  color: red;
  font-size: 15px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardProductPrice = styled.Text`
  color: brown;
  font-size: 15px;
  font-family: ${CustomFontFamily.fifth};
`;

export const Section = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  top: 3px;
`;

export const SectionEditProfile = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  top: 3px;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 0px;
`;

export const StyledCardRating = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledCardButtonContainer = styled(TouchableOpacity)`
  background-color: #f79824;
  border-radius: 3px;
  width: 100px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export const StyledCardRoundButtonContainer = styled(TouchableOpacity)`
  background-color: #f79824;
  border-radius: 25px;
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const StyledCardWeightProductText = styled.Text`
  color: red;
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-family: ${CustomFontFamily.fouth};
`;

//Card Details

export const CardDetailSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 3px;
  top: 3px;
`;

export const CardDetailSectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 3px;
`;

export const StyledCardDetailTitle = styled.Text`
  font-size: 30px;
  font-family: ${CustomFontFamily.fouth};
  color: red;
`;

export const StyledCardDetailMoreDetails = styled.Text`
  font-size: 15px;
  padding: 5px;
  font-family: ${CustomFontFamily.first};
  color: black;
  opacity: 0.7;
`;

export const StyledCardDetailAmount = styled.Text`
  color: black;
  font-size: 40px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardDetailOfferAmount = styled.Text`
  color: black;
  font-size: 20px;
  opacity:0.5
  padding-left:10px;
  text-decoration: line-through;
`;

export const StyledCardDetailOfferPercentage = styled.Text`
  color: green;
  font-size: 20px;
  padding-left: 10px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardDetailDesc = styled.Text`
  flex: 1;
  font-size: 15px;
  font-family: ${CustomFontFamily.first};
  color: black;
  padding: 5px;
  opacity: 0.7;
`;

export const StyledCardDetailProductNumber = styled.Text`
  font-size: 15px;
  font-family: ${CustomFontFamily.third};
  color: black;
  opacity: 0.5;
`;

export const StyledCardDetailProductType = styled.Text`
  font-size: 15px;
  font-family: ${CustomFontFamily.third};
  color: black;
  opacity: 0.5;
`;

export const StyledCardDetailProductAvailable = styled.Text`
  color: green;
  font-size: 15px;
  font-family: ${CustomFontFamily.fouth};
`;

export const StyledCardDetailProductOutOfStock = styled.Text`
  color: red;
  font-size: 15px;
  font-family: ${CustomFontFamily.fouth};
`;
