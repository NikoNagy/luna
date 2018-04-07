/**
 * Data over time
 * http://d3js.org
 **/

import { isAlpha, isBeta, isRC, objectEntries } from 'utils'
import { withStyles } from 'material-ui/styles'
import * as d3 from 'd3'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'

const MARGINS = {
  top: 20,
  right: 15,
  bottom: 10,
  left: 25
}

const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%SZ')

class TimeGraph extends React.Component {
  constructor(props) {
    super(props)
    this._drawChart = this._drawChart.bind(this)
  }
  _drawChart(versions, dates) {
    const svgEl = this.svgEl

    if (svgEl) {
      let svg = d3.select(svgEl)

      const width = svg.attr('width') - MARGINS.left - MARGINS.right,
        height = svg.attr('height') - MARGINS.top - MARGINS.bottom

      const scaleX = d3
        .scaleTime()
        .domain([new Date(d3.min(dates)), new Date()])
        .range([0, width])

      const scaleY = d3
        .scaleLinear()
        .domain([0, d3.max(versions)])
        .range([height, 0])

      svg
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(30,' + (height + MARGINS.bottom) + ')')
        .call(d3.axisBottom(scaleX).ticks(d3.timeMonth.every(6)))

      svg
        .append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(30, 10)')
        .call(d3.axisLeft(scaleY))

      //merge versions && dates
      console.log(versions.length, dates.length)

      // svg
      //   .append('g')
      //   .attr('transform', 'translate(30, 10)')
      //   .selectAll('.dot')
      //   .data(data)
      //   .enter()
      //   .append('circle')
      //   .attr('class', 'dot')
      //   .attr('r', 3.5)
      //   .attr('cx', function(d) {
      //     return scaleX(new Date(d.date))
      //   })
      //   .attr('cy', function(d) {
      //     return scaleY(d.version)
      //   })
      //   .style('fill', 'blue')
    }
  }
  componentDidMount() {
    const { active } = this.props
    const { time } = active || {}

    if (time && typeof time === 'object') {
      try {
      } catch (e) {
        throw new Error(e)
      }

      const _versions = Object.keys(time)
      let dates = Object.values(time).sort()

      const versions =
        _versions &&
        _versions
          .map((version) => {
            const isBetaVersion = isBeta(version)
            const isAlphaVersion = isAlpha(version)
            const isRCVersion = isRC(version)

            if (
              !isBetaVersion &&
              !isAlphaVersion &&
              !isRCVersion &&
              version.indexOf('.') > -1
            ) {
              const parts = version.split('.')
              return parseFloat(Number(parts[0] + '.' + parts[1] + parts[2]))
            }
          })
          .filter((v, i) => {
            if (!v) {
              dates.splice(i, 1)
            }
            return v
          })
          .sort()

      this._drawChart(versions, dates)
    }
  }
  render() {
    return (
      <section>
        <svg
          width="500"
          height="325"
          ref={(node) => {
            this.svgEl = node
          }}
        />
      </section>
    )
  }
}

export default TimeGraph
