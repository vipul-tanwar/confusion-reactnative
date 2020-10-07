import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
} 

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})



function RenderDish(props) {
    
    const dish = props.dish;
    const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
        if (dx < -200)
            return true;
        else 
            return false;
    };  

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true ;
        },
        onPanResponderEnd: (e, gestureState) => {
            if(recognizeDrag(gestureState))
                Alert.alert( 
                    'Add Favorites',
                    'Are you sure wish to add '+ dish.name + 'to your favorites ?',
                    [
                        {
                            text: 'Cancel', 
                            onPress: () => console.log('Cancel Pressed'), style: 'cancel'
                        },
                        {   
                            text: 'OK', 
                            onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}
                        },
                    ],
                    { cancelable: false }
                )
            return true;
        }
    }) 
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl +  dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Icon
                        raised 
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favourite') : props.onPress()}
                    />
  
                        <Icon
                        raised 
                        reverse
                        name= 'pencil'
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.onPressComment()}
                        />
                        
                </View>
                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;
    
    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000} >
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}/>
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    constructor(props) {
        super(props);
        this.state = {
            rating: 3,
            author: '',
            comment: '',
            showModal: false
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            rating: 3,
            author: '',
            comment: '',
            showModal: false
        });
    }

    handleComment(dishId){
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
        this.resetForm();
    } 


    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                favorite={this.props.favorites.some(el => el === dishId)} 
                onPress={() => this.markFavorite(dishId)}
                onPressComment={() => this.toggleModal() }/>
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal 
                    animationType = {"slide"} 
                    transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                <View style={styles.modal}>
                   <Rating
                     imageSize={30}
                     startingValue={3}
                     showRating
                     onFinishRating={(rating) => this.setState({rating: rating})}
                     style={{ paddingVertical: 10 }}
                    />
                    <View>
                    <Input 
                        placeholder="Author" 
                        onChangeText={(value) => this.setState({author: value})}
                        leftIcon={{ type: "font-awesome", name: "user-o", marginRight: 10 }} />
                    </View>
                    <Input placeholder="Comment"
                        onChangeText={(value) => this.setState({comment: value})}
                        leftIcon={{ type: "font-awesome", name: "comment-o", marginRight: 10 }} />
                    <View style={styles.modalButton}>
                        <Button 
                        onPress = {() =>{this.handleComment(dishId);}}
                        color="#512DA8"
                        title="SUBMIT" 
                        ></Button>
                    </View>
                    <View style={styles.modalButton}>
                        <Button
                        onPress = {() =>{this.toggleModal();}}
                        color="#512DA8"
                        title="CANCEL" 
                        color="grey"
                        ></Button> 
                    </View>
                    
                </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles =StyleSheet.create({
    modal: {
        margin:20
    },
    modalButton:{ 
        marginHorizontal: 10,
        marginTop: 20
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
