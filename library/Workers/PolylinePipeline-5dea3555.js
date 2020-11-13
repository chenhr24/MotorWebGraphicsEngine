define(["exports","./when-7ef6387a","./DeveloperError-101d8eb9","./Cartesian3-ca5d3f12","./Ellipsoid-57478151","./Matrix4-027dd006","./IntersectionTests-2926775d","./Plane-08adaa50","./EllipsoidRhumbLine-2da2335c","./EllipsoidGeodesic-079fee05"],(function(a,e,r,i,t,n,o,s,c,l){"use strict";var u={numberOfPoints:function(a,e,r){var t=i.Cartesian3.distance(a,e);return Math.ceil(t/r)},numberOfPointsRhumbLine:function(a,e,r){var i=Math.pow(a.longitude-e.longitude,2)+Math.pow(a.latitude-e.latitude,2);return Math.ceil(Math.sqrt(i/(r*r)))}},h=new t.Cartographic;u.extractHeights=function(a,e){for(var r=a.length,i=new Array(r),t=0;t<r;t++){var n=a[t];i[t]=e.cartesianToCartographic(n,h).height}return i};var f=new n.Matrix4,d=new i.Cartesian3,p=new i.Cartesian3,g=new s.Plane(i.Cartesian3.UNIT_X,0),C=new i.Cartesian3,v=new s.Plane(i.Cartesian3.UNIT_X,0),m=new i.Cartesian3,w=new i.Cartesian3,T=[];function P(a,e,r){var i,t=T;if(t.length=a,e===r){for(i=0;i<a;i++)t[i]=e;return t}var n=(r-e)/a;for(i=0;i<a;i++){var o=e+i*n;t[i]=o}return t}var y=new t.Cartographic,E=new t.Cartographic,A=new i.Cartesian3,S=new i.Cartesian3,R=new i.Cartesian3,b=new l.EllipsoidGeodesic,D=new c.EllipsoidRhumbLine;function M(a,e,r,t,n,o,s,c){var l=t.scaleToGeodeticSurface(a,S),h=t.scaleToGeodeticSurface(e,R),f=u.numberOfPoints(a,e,r),d=t.cartesianToCartographic(l,y),p=t.cartesianToCartographic(h,E),g=P(f,n,o);b.setEndPoints(d,p);var C=b.surfaceDistance/f,v=c;d.height=n;var m=t.cartographicToCartesian(d,A);i.Cartesian3.pack(m,s,v),v+=3;for(var w=1;w<f;w++){var T=b.interpolateUsingSurfaceDistance(w*C,E);T.height=g[w],m=t.cartographicToCartesian(T,A),i.Cartesian3.pack(m,s,v),v+=3}return v}function x(a,e,r,t,n,o,s,l){var h=t.scaleToGeodeticSurface(a,S),f=t.scaleToGeodeticSurface(e,R),d=t.cartesianToCartographic(h,y),p=t.cartesianToCartographic(f,E),g=u.numberOfPointsRhumbLine(d,p,r),C=P(g,n,o);D.ellipsoid.equals(t)||(D=new c.EllipsoidRhumbLine(void 0,void 0,t)),D.setEndPoints(d,p);var v=D.surfaceDistance/g,m=l;d.height=n;var w=t.cartographicToCartesian(d,A);i.Cartesian3.pack(w,s,m),m+=3;for(var T=1;T<g;T++){var b=D.interpolateUsingSurfaceDistance(T*v,E);b.height=C[T],w=t.cartographicToCartesian(b,A),i.Cartesian3.pack(w,s,m),m+=3}return m}u.wrapLongitude=function(a,r){var t=[],c=[];if(e.defined(a)&&a.length>0){r=e.defaultValue(r,n.Matrix4.IDENTITY);var l=n.Matrix4.inverseTransformation(r,f),u=n.Matrix4.multiplyByPoint(l,i.Cartesian3.ZERO,d),h=i.Cartesian3.normalize(n.Matrix4.multiplyByPointAsVector(l,i.Cartesian3.UNIT_Y,p),p),T=s.Plane.fromPointNormal(u,h,g),P=i.Cartesian3.normalize(n.Matrix4.multiplyByPointAsVector(l,i.Cartesian3.UNIT_X,C),C),y=s.Plane.fromPointNormal(u,P,v),E=1;t.push(i.Cartesian3.clone(a[0]));for(var A=t[0],S=a.length,R=1;R<S;++R){var b=a[R];if(s.Plane.getPointDistance(y,A)<0||s.Plane.getPointDistance(y,b)<0){var D=o.IntersectionTests.lineSegmentPlane(A,b,T,m);if(e.defined(D)){var M=i.Cartesian3.multiplyByScalar(h,5e-9,w);s.Plane.getPointDistance(T,A)<0&&i.Cartesian3.negate(M,M),t.push(i.Cartesian3.add(D,M,new i.Cartesian3)),c.push(E+1),i.Cartesian3.negate(M,M),t.push(i.Cartesian3.add(D,M,new i.Cartesian3)),E=1}}t.push(i.Cartesian3.clone(a[R])),E++,A=b}c.push(E)}return{positions:t,lengths:c}},u.generateArc=function(a){e.defined(a)||(a={});var n=a.positions;if(!e.defined(n))throw new r.DeveloperError("options.positions is required.");var o=n.length,s=e.defaultValue(a.ellipsoid,t.Ellipsoid.WGS84),c=e.defaultValue(a.height,0),l=Array.isArray(c);if(o<1)return[];if(1===o){var h=s.scaleToGeodeticSurface(n[0],S);if(0!==(c=l?c[0]:c)){var f=s.geodeticSurfaceNormal(h,A);i.Cartesian3.multiplyByScalar(f,c,f),i.Cartesian3.add(h,f,h)}return[h.x,h.y,h.z]}var d=a.minDistance;if(!e.defined(d)){var p=e.defaultValue(a.granularity,i.CesiumMath.RADIANS_PER_DEGREE);d=i.CesiumMath.chordLength(p,s.maximumRadius)}var g,C=0;for(g=0;g<o-1;g++)C+=u.numberOfPoints(n[g],n[g+1],d);var v=3*(C+1),m=new Array(v),w=0;for(g=0;g<o-1;g++){w=M(n[g],n[g+1],d,s,l?c[g]:c,l?c[g+1]:c,m,w)}T.length=0;var P=n[o-1],E=s.cartesianToCartographic(P,y);E.height=l?c[o-1]:c;var R=s.cartographicToCartesian(E,A);return i.Cartesian3.pack(R,m,v-3),m};var G=new t.Cartographic,N=new t.Cartographic;u.generateRhumbArc=function(a){e.defined(a)||(a={});var n=a.positions;if(!e.defined(n))throw new r.DeveloperError("options.positions is required.");var o=n.length,s=e.defaultValue(a.ellipsoid,t.Ellipsoid.WGS84),c=e.defaultValue(a.height,0),l=Array.isArray(c);if(o<1)return[];if(1===o){var h=s.scaleToGeodeticSurface(n[0],S);if(0!==(c=l?c[0]:c)){var f=s.geodeticSurfaceNormal(h,A);i.Cartesian3.multiplyByScalar(f,c,f),i.Cartesian3.add(h,f,h)}return[h.x,h.y,h.z]}var d,p,g=e.defaultValue(a.granularity,i.CesiumMath.RADIANS_PER_DEGREE),C=0,v=s.cartesianToCartographic(n[0],G);for(d=0;d<o-1;d++)p=s.cartesianToCartographic(n[d+1],N),C+=u.numberOfPointsRhumbLine(v,p,g),v=t.Cartographic.clone(p,G);var m=3*(C+1),w=new Array(m),P=0;for(d=0;d<o-1;d++){P=x(n[d],n[d+1],g,s,l?c[d]:c,l?c[d+1]:c,w,P)}T.length=0;var E=n[o-1],R=s.cartesianToCartographic(E,y);R.height=l?c[o-1]:c;var b=s.cartographicToCartesian(R,A);return i.Cartesian3.pack(b,w,m-3),w},u.generateCartesianArc=function(a){for(var e=u.generateArc(a),r=e.length/3,t=new Array(r),n=0;n<r;n++)t[n]=i.Cartesian3.unpack(e,3*n);return t},u.generateCartesianRhumbArc=function(a){for(var e=u.generateRhumbArc(a),r=e.length/3,t=new Array(r),n=0;n<r;n++)t[n]=i.Cartesian3.unpack(e,3*n);return t},a.PolylinePipeline=u}));
//# sourceMappingURL=PolylinePipeline-5dea3555.js.map