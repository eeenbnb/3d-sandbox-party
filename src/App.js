import React, { Component } from 'react'
import { BrowserRouter, Route, Link, LinkContainer} from 'react-router-dom'
import {Grid,Row,Col,MenuItem,Nav,NavItem} from 'react-bootstrap';

import View3d20171003 from './pages/20171003'

const App = () => (
  <BrowserRouter>
    <Grid>
      <Row className="show-grid">
        <Col xs={12} md={4}>
          <Nav bsStyle="pills" stacked>
            <NavItem href="/">
                home
            </NavItem>
            <NavItem href="20171003">
              2017/10/03
            </NavItem>
          </Nav>
        </Col>

        <Col xs={12} md={8}>
          <div style={{height:"100%"}}>
            <Route exact path='/' component={Home} />
            <Route path='/20171003' component={View3d20171003} />
          </div>
        </Col>
      </Row>
    </Grid>
  </BrowserRouter>
)

const Home = () => (
  <div>
    <p>This project is sandbox by eee_nbnb.</p>
  </div>
)

export default App
