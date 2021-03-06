import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import LineSeriesCanvas from 'plot/series/line-series-canvas';

test('LineSeriesCanvas: should be rendered', t => {
  const k = 7;

  const $ = mount(
    <XYPlot width={300} height={300}>
      {Array(k)
        .fill(0)
        .map(v => (
          <LineSeriesCanvas
            color="#12939a"
            data={[{x: 1, y: 5}, {x: 2, y: 20}, {x: 3, y: 10}]}
          />
        ))}
    </XYPlot>
  );

  t.equal(
    $.find('CanvasWrapper')
      .children()
      .find('LineSeriesCanvas').length,
    k,
    'should render correct amount of LineSeriesCanvas children'
  );
  t.end();
});

test('LineSeriesCanvas: on onNearestXY should be called', t => {
  const k = 7;
  t.plan(k);

  const $ = mount(
    <XYPlot width={300} height={300}>
      {[...Array(k).keys()].map(v => (
        <LineSeriesCanvas
          color="#12939a"
          data={[{x: 1, y: 5}, {x: 2, y: 20}, {x: 3, y: 10}]}
          onNearestXY={(value, {event}) =>
            t.pass(`onNearestXY called for series # ${v}`)
          }
        />
      ))}
    </XYPlot>
  );

  $.find('.rv-xy-plot__inner').simulate('mousemove', {
    nativeEvent: {clientX: 150, clientY: 150}
  });
  t.end();
});
