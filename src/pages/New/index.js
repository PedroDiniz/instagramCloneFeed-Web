import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Container, Input, Btn } from './styles';

export default class New extends Component {
  static propTypes = {
    history: PropTypes.func.isRequired,
  };

  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };

  handleSubmit = async (e) => {
    const { history } = this.props;
    e.preventDefault();
    const data = new FormData();
    const {
      image, author, place, description, hashtags,
    } = this.state;
    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('posts', data);

    history.push('/');
  };

  handleImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      author, place, description, hashtags,
    } = this.state;
    return (
      <Container onSubmit={this.handleSubmit}>
        <Input type="file" onChange={this.handleImageChange} />
        <Input
          type="text"
          name="author"
          placeholder="Autor do post"
          onChange={this.handleChange}
          value={author}
        />
        <Input
          type="text"
          name="place"
          placeholder="Local do post"
          onChange={this.handleChange}
          value={place}
        />
        <Input
          type="text"
          name="description"
          placeholder="Descrição do post"
          onChange={this.handleChange}
          value={description}
        />
        <Input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          onChange={this.handleChange}
          value={hashtags}
        />
        <Btn type="submit">Enviar</Btn>
      </Container>
    );
  }
}
