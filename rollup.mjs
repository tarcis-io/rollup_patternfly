import commonjs         from '@rollup/plugin-commonjs';
import { nodeResolve }  from '@rollup/plugin-node-resolve';
import replace          from '@rollup/plugin-replace';
import terser           from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';
import scss             from 'rollup-plugin-scss';
import svg              from 'rollup-plugin-svg';

export default function () {

	return defineConfig({
		input    : 'input.js',
		output   : {
			name                 : 'RollupPatternfly',
			file                 : 'dist/patternfly.min.js',
			format               : 'esm',
			inlineDynamicImports : true,
			globals              : {
				'react'     : 'React',
				'react-dom' : 'ReactDOM'
			}
		},
		external : [
			'react',
			'react-dom'
		],
		plugins  : [
			replace({
				'process.env.NODE_ENV' : JSON.stringify('production'),
				'preventAssignment'    : true
			}),
			nodeResolve(),
			commonjs(),
			scss({
				fileName    : 'patternfly.min.css',
				outputStyle : 'compressed'
			}),
			svg(),
			terser({
				format : {
					comments : false
				}
			})
		]
	});
};
