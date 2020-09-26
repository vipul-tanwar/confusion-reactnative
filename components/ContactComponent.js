import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    render(){
        return(
            <Card title='Contact Information' >
                <Text style={{margin:10}}>
                    121, Clear Water Bay Road<br/>
                    Clear Water Bay, Kowloon<br/>
                    HONG KONG<br/>
                    Tel: +852 1234 5678<br/>
                    Fax: +852 8765 4321<br/>
                    Email:confusion@food.net 
                </Text>
            </Card>
        )
    }
}

export default Contact;
