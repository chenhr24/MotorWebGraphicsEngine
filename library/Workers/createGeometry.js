/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */

define(['./when-7ef6387a', './Check-ed6a1804', './Cartesian3-18c04df5', './Ellipsoid-f29f901d', './Transforms-239db6ff', './Matrix4-c68aaa66', './RuntimeError-5b606d78', './Cartesian2-e5f465dc', './WebGLConstants-30fc6f5c', './ComponentDatatype-a863af81', './GeometryAttribute-de79a9c2', './PrimitiveType-4c1d698a', './FeatureDetection-0c56f1be', './GeometryAttributes-cb18da36', './AttributeCompression-414035f7', './GeometryPipeline-5359445f', './EncodedCartesian3-24b261d0', './IndexDatatype-571b3b65', './IntersectionTests-927a9102', './Plane-f22e7e98', './PrimitivePipeline-2cf9040d', './WebMercatorProjection-96eb07e4', './createTaskProcessorWorker'], function (when, Check, Cartesian3, Ellipsoid, Transforms, Matrix4, RuntimeError, Cartesian2, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, FeatureDetection, GeometryAttributes, AttributeCompression, GeometryPipeline, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, PrimitivePipeline, WebMercatorProjection, createTaskProcessorWorker) { 'use strict';

    /* global require */

        var moduleCache = {};

        function getModule(moduleName) {
            var module = moduleCache[moduleName];
            if (!when.defined(module)) {
                if (typeof exports === 'object') {
                    // Use CommonJS-style require.
                    moduleCache[module] = module = require('Workers/' + moduleName);
                } else {
                    // Use AMD-style require.
                    // in web workers, require is synchronous
                    require(['Workers/' + moduleName], function(f) {
                        module = f;
                        moduleCache[module] = f;
                    });
                }
            }
            return module;
        }

        function createGeometry(parameters, transferableObjects) {
            var subTasks = parameters.subTasks;
            var length = subTasks.length;
            var resultsOrPromises = new Array(length);

            for (var i = 0; i < length; i++) {
                var task = subTasks[i];
                var geometry = task.geometry;
                var moduleName = task.moduleName;

                if (when.defined(moduleName)) {
                    var createFunction = getModule(moduleName);
                    resultsOrPromises[i] = createFunction(geometry, task.offset);
                } else {
                    //Already created geometry
                    resultsOrPromises[i] = geometry;
                }
            }

            return when.when.all(resultsOrPromises, function(results) {
                return PrimitivePipeline.PrimitivePipeline.packCreateGeometryResults(results, transferableObjects);
            });
        }
    var createGeometry$1 = createTaskProcessorWorker(createGeometry);

    return createGeometry$1;

});
//# sourceMappingURL=createGeometry.js.map
