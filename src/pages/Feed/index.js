import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../../services/api';

import {
  Container,
  Article,
  Header,
  UserInfo,
  User,
  Place,
  ImgPost,
  Img,
  Footer,
  Actions,
  Strong,
  P,
  Hashtags,
  Btn,
} from './styles';
import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';

class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get('getposts');

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const { feed } = this.state;
    const socket = io('http://localhost:3333');
    socket.on('post', (newPost) => {
      this.setState({ feed: [newPost, ...feed] });
    });
    socket.on('like', (newLike) => {
      this.setState({
        feed: feed.map(post => (post._id === newLike._id ? newLike : post)),
      });
    });
  };

  handleLike = async (id) => {
    await api.post(`/post/${id}/like`);
  };

  render() {
    const { feed } = this.state;
    return (
      <Container>
        {feed.map(post => (
          <Article key={post._id}>
            <Header>
              <UserInfo>
                <User>{post.author}</User>
                <Place>{post.place}</Place>
              </UserInfo>
              <img src={more} alt="mais" />
            </Header>
            <ImgPost src={`http://localhost:3333/files/${post.image}`} alt="" />
            <Footer>
              <Actions>
                <Btn onClick={() => this.handleLike(post._id)}>
                  <Img src={like} alt="" />
                </Btn>
                <Img src={comment} alt="" />
                <Img src={send} alt="" />
              </Actions>
              <Strong>
                {post.likes}
                curtidas
              </Strong>
              <P>
                {post.description}
                <Hashtags>{post.Hashtags}</Hashtags>
              </P>
            </Footer>
          </Article>
        ))}
      </Container>
    );
  }
}

export default Feed;
