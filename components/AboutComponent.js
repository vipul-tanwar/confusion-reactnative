import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl} from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History() {
    return(
        <Card  titleStyle={{ fontSize: 16 }} title='Our History' >
            <Text style={{margin:10}}>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary 
            icon par excellence in Hong Kong. With its unique brand of world fusion cuisine
            that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  
            Featuring four of the best three-star Michelin chefs in the world, 
            you never know what will arrive on your plate the next time you visit us.
            </Text>
            <Text style={{margin:10}}>
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain 
            started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    )
}

function CorporateLeadership(props){
    const leaders =  props.leaders;

    if(leaders !== null){
        const renderLeader = ({item, index}) => {
            return (
                <ListItem 
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                leftAvatar={{ source: { uri: baseUrl + item.image }}}
                />
            )

        }

        if (props.isLoading) {
            return(
                    <Card
                    titleStyle={{ fontSize: 16 }}
                    title='Corporate Leadership'>
                        <Loading />
                    </Card>
            );
        }
        else if (props.errMess) {
            return(
                    <Card
                    titleStyle={{ fontSize: 16 }}
                    title='Corporate Leadership'>
                        <Text>{props.errMess}</Text>
                    </Card>
            );
        }
        else {
            return (
                <Card 
                titleStyle={{ fontSize: 16 }}
                title='Corporate Leadership'>
                    <FlatList 
                    data={leaders}
                    renderItem={renderLeader}
                    keyExtractor={item => item.id.toString()}
                    />
                </Card>
            )
        }
    }
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    };

    render(){
        return(
        <ScrollView>
            <History/>
            <CorporateLeadership 
            leaders={this.props.leaders.leaders} 
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}/>
        </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(About);