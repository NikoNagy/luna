/**
 * Data over time
 * http://d3js.org
 **/

import { objectEntries } from 'utils'
import { withStyles } from 'material-ui/styles'
import * as d3 from 'd3'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'

const MARGINS = {
  top: 15,
  right: 15,
  bottom: 20,
  left: 25
}

class TimeGraph extends React.Component {
  constructor(props) {
    super(props)
    this._drawAxis = this._drawAxis.bind(this)
  }
  _drawAxis(data) {
    const svgEl = this.svgEl

    let svg = d3.select(svgEl)
    const width = svg.attr('width') - MARGINS.left - MARGINS.right,
      height = svg.attr('height') - MARGINS.top - MARGINS.bottom

    let g = svg
      .append('g')
      .attr('transform', 'translate(' + MARGINS.left + ',' + MARGINS.top + ')')

    const x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0])

    g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))

    g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y))

    g
      .selectAll('circle')
      .data(data)
      .enter()
      .attr('cx', (d, i) => d[i][0])
      .attr('cy', (d, i) => d[i][1])
      .attr('r', 5)
  }
  componentDidMount() {
    const { active } = this.props

    const data = active && active.time
    const dataArr = objectEntries(data)

    this._drawAxis(dataArr)
  }
  render() {
    return (
      <section>
        <Typography variant="caption">TimeGraph</Typography>
        <Divider />
        <svg
          width="500"
          height="300"
          ref={(node) => {
            this.svgEl = node
          }}
        />
      </section>
    )
  }
}

export default TimeGraph
