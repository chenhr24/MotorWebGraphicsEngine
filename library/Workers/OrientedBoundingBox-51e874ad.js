/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
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
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./Cartesian2-f49a1383","./Plane-84b14a0a","./EllipsoidTangentPlane-3967708f"],(function(e,a,t,r,n,i,s,o,d,u,l){"use strict";function C(e,t){this.center=n.Cartesian3.clone(a.defaultValue(e,n.Cartesian3.ZERO)),this.halfAxes=o.Matrix3.clone(a.defaultValue(t,o.Matrix3.ZERO))}C.packedLength=n.Cartesian3.packedLength+o.Matrix3.packedLength,C.pack=function(e,r,i){return t.Check.typeOf.object("value",e),t.Check.defined("array",r),i=a.defaultValue(i,0),n.Cartesian3.pack(e.center,r,i),o.Matrix3.pack(e.halfAxes,r,i+n.Cartesian3.packedLength),r},C.unpack=function(e,r,i){return t.Check.defined("array",e),r=a.defaultValue(r,0),a.defined(i)||(i=new C),n.Cartesian3.unpack(e,r,i.center),o.Matrix3.unpack(e,r+n.Cartesian3.packedLength,i.halfAxes),i};var c=new n.Cartesian3,h=new n.Cartesian3,x=new n.Cartesian3,f=new n.Cartesian3,M=new n.Cartesian3,w=new n.Cartesian3,m=new o.Matrix3,p={unitary:new o.Matrix3,diagonal:new o.Matrix3};C.fromPoints=function(e,t){if(a.defined(t)||(t=new C),!a.defined(e)||0===e.length)return t.halfAxes=o.Matrix3.ZERO,t.center=n.Cartesian3.ZERO,t;var r,i=e.length,s=n.Cartesian3.clone(e[0],c);for(r=1;r<i;r++)n.Cartesian3.add(s,e[r],s);var d=1/i;n.Cartesian3.multiplyByScalar(s,d,s);var u,l=0,g=0,y=0,b=0,v=0,E=0;for(r=0;r<i;r++)l+=(u=n.Cartesian3.subtract(e[r],s,h)).x*u.x,g+=u.x*u.y,y+=u.x*u.z,b+=u.y*u.y,v+=u.y*u.z,E+=u.z*u.z;l*=d,g*=d,y*=d,b*=d,v*=d,E*=d;var A=m;A[0]=l,A[1]=g,A[2]=y,A[3]=g,A[4]=b,A[5]=v,A[6]=y,A[7]=v,A[8]=E;var O=o.Matrix3.computeEigenDecomposition(A,p),N=o.Matrix3.clone(O.unitary,t.halfAxes),P=o.Matrix3.getColumn(N,0,f),D=o.Matrix3.getColumn(N,1,M),I=o.Matrix3.getColumn(N,2,w),L=-Number.MAX_VALUE,q=-Number.MAX_VALUE,S=-Number.MAX_VALUE,R=Number.MAX_VALUE,T=Number.MAX_VALUE,z=Number.MAX_VALUE;for(r=0;r<i;r++)u=e[r],L=Math.max(n.Cartesian3.dot(P,u),L),q=Math.max(n.Cartesian3.dot(D,u),q),S=Math.max(n.Cartesian3.dot(I,u),S),R=Math.min(n.Cartesian3.dot(P,u),R),T=Math.min(n.Cartesian3.dot(D,u),T),z=Math.min(n.Cartesian3.dot(I,u),z);P=n.Cartesian3.multiplyByScalar(P,.5*(R+L),P),D=n.Cartesian3.multiplyByScalar(D,.5*(T+q),D),I=n.Cartesian3.multiplyByScalar(I,.5*(z+S),I);var V=n.Cartesian3.add(P,D,t.center);n.Cartesian3.add(V,I,V);var U=x;return U.x=L-R,U.y=q-T,U.z=S-z,n.Cartesian3.multiplyByScalar(U,.5,U),o.Matrix3.multiplyByScale(t.halfAxes,U,t.halfAxes),t};var g=new n.Cartesian3,y=new n.Cartesian3;var b=new i.Cartographic,v=new n.Cartesian3,E=[new i.Cartographic,new i.Cartographic,new i.Cartographic,new i.Cartographic,new i.Cartographic,new i.Cartographic,new i.Cartographic,new i.Cartographic],A=[new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3,new n.Cartesian3],O=[new d.Cartesian2,new d.Cartesian2,new d.Cartesian2,new d.Cartesian2,new d.Cartesian2,new d.Cartesian2,new d.Cartesian2,new d.Cartesian2];C.fromRectangle=function(e,s,c,h,x){if(!a.defined(e))throw new t.DeveloperError("rectangle is required");if(e.width<0||e.width>r.CesiumMath.TWO_PI)throw new t.DeveloperError("Rectangle width must be between 0 and 2*pi");if(e.height<0||e.height>r.CesiumMath.PI)throw new t.DeveloperError("Rectangle height must be between 0 and pi");if(a.defined(h)&&!r.CesiumMath.equalsEpsilon(h.radii.x,h.radii.y,r.CesiumMath.EPSILON15))throw new t.DeveloperError("Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)");s=a.defaultValue(s,0),c=a.defaultValue(c,0),h=a.defaultValue(h,i.Ellipsoid.WGS84);var f=d.Rectangle.center(e,b),M=h.cartographicToCartesian(f,v),w=new l.EllipsoidTangentPlane(M,h),m=w.plane,p=E[0],N=E[1],P=E[2],D=E[3],I=E[4],L=E[5],q=E[6],S=E[7],R=f.longitude,T=e.south<0&&e.north>0?0:f.latitude;q.latitude=L.latitude=I.latitude=e.south,S.latitude=D.latitude=T,p.latitude=N.latitude=P.latitude=e.north,q.longitude=S.longitude=p.longitude=e.west,L.longitude=N.longitude=R,I.longitude=D.longitude=P.longitude=e.east,P.height=N.height=p.height=S.height=q.height=L.height=I.height=D.height=c,h.cartographicArrayToCartesianArray(E,A),w.projectPointsToNearestOnPlane(A,O);var z=Math.min(O[6].x,O[7].x,O[0].x),V=Math.max(O[2].x,O[3].x,O[4].x),U=Math.min(O[4].y,O[5].y,O[6].y),k=Math.max(O[0].y,O[1].y,O[2].y);return P.height=p.height=I.height=q.height=s,h.cartographicArrayToCartesianArray(E,A),function(e,r,i,s,d,u,l,c){if(!(a.defined(r)&&a.defined(i)&&a.defined(s)&&a.defined(d)&&a.defined(u)&&a.defined(l)))throw new t.DeveloperError("all extents (minimum/maximum X/Y/Z) are required.");a.defined(c)||(c=new C);var h=c.halfAxes;o.Matrix3.setColumn(h,0,e.xAxis,h),o.Matrix3.setColumn(h,1,e.yAxis,h),o.Matrix3.setColumn(h,2,e.zAxis,h);var x=g;x.x=(r+i)/2,x.y=(s+d)/2,x.z=(u+l)/2;var f=y;f.x=(i-r)/2,f.y=(d-s)/2,f.z=(l-u)/2;var M=c.center;return x=o.Matrix3.multiplyByVector(h,x,x),n.Cartesian3.add(e.origin,x,M),o.Matrix3.multiplyByScale(h,f,h),c}(w,z,V,U,k,Math.min(u.Plane.getPointDistance(m,A[0]),u.Plane.getPointDistance(m,A[2]),u.Plane.getPointDistance(m,A[4]),u.Plane.getPointDistance(m,A[6])),c,x)},C.clone=function(e,t){if(a.defined(e))return a.defined(t)?(n.Cartesian3.clone(e.center,t.center),o.Matrix3.clone(e.halfAxes,t.halfAxes),t):new C(e.center,e.halfAxes)},C.intersectPlane=function(e,r){if(!a.defined(e))throw new t.DeveloperError("box is required.");if(!a.defined(r))throw new t.DeveloperError("plane is required.");var i=e.center,d=r.normal,u=e.halfAxes,l=d.x,C=d.y,c=d.z,h=Math.abs(l*u[o.Matrix3.COLUMN0ROW0]+C*u[o.Matrix3.COLUMN0ROW1]+c*u[o.Matrix3.COLUMN0ROW2])+Math.abs(l*u[o.Matrix3.COLUMN1ROW0]+C*u[o.Matrix3.COLUMN1ROW1]+c*u[o.Matrix3.COLUMN1ROW2])+Math.abs(l*u[o.Matrix3.COLUMN2ROW0]+C*u[o.Matrix3.COLUMN2ROW1]+c*u[o.Matrix3.COLUMN2ROW2]),x=n.Cartesian3.dot(d,i)+r.distance;return x<=-h?s.Intersect.OUTSIDE:x>=h?s.Intersect.INSIDE:s.Intersect.INTERSECTING};var N=new n.Cartesian3,P=new n.Cartesian3,D=new n.Cartesian3,I=new n.Cartesian3;C.distanceSquaredTo=function(e,r){if(!a.defined(e))throw new t.DeveloperError("box is required.");if(!a.defined(r))throw new t.DeveloperError("cartesian is required.");var i=n.Cartesian3.subtract(r,e.center,g),s=e.halfAxes,d=o.Matrix3.getColumn(s,0,N),u=o.Matrix3.getColumn(s,1,P),l=o.Matrix3.getColumn(s,2,D),C=n.Cartesian3.magnitude(d),c=n.Cartesian3.magnitude(u),h=n.Cartesian3.magnitude(l);n.Cartesian3.normalize(d,d),n.Cartesian3.normalize(u,u),n.Cartesian3.normalize(l,l);var x=I;x.x=n.Cartesian3.dot(i,d),x.y=n.Cartesian3.dot(i,u),x.z=n.Cartesian3.dot(i,l);var f,M=0;return x.x<-C?M+=(f=x.x+C)*f:x.x>C&&(M+=(f=x.x-C)*f),x.y<-c?M+=(f=x.y+c)*f:x.y>c&&(M+=(f=x.y-c)*f),x.z<-h?M+=(f=x.z+h)*f:x.z>h&&(M+=(f=x.z-h)*f),M};var L=new n.Cartesian3,q=new n.Cartesian3;C.computePlaneDistances=function(e,r,i,d){if(!a.defined(e))throw new t.DeveloperError("box is required.");if(!a.defined(r))throw new t.DeveloperError("position is required.");if(!a.defined(i))throw new t.DeveloperError("direction is required.");a.defined(d)||(d=new s.Interval);var u=Number.POSITIVE_INFINITY,l=Number.NEGATIVE_INFINITY,C=e.center,c=e.halfAxes,h=o.Matrix3.getColumn(c,0,N),x=o.Matrix3.getColumn(c,1,P),f=o.Matrix3.getColumn(c,2,D),M=n.Cartesian3.add(h,x,L);n.Cartesian3.add(M,f,M),n.Cartesian3.add(M,C,M);var w=n.Cartesian3.subtract(M,r,q),m=n.Cartesian3.dot(i,w);return u=Math.min(m,u),l=Math.max(m,l),n.Cartesian3.add(C,h,M),n.Cartesian3.add(M,x,M),n.Cartesian3.subtract(M,f,M),n.Cartesian3.subtract(M,r,w),m=n.Cartesian3.dot(i,w),u=Math.min(m,u),l=Math.max(m,l),n.Cartesian3.add(C,h,M),n.Cartesian3.subtract(M,x,M),n.Cartesian3.add(M,f,M),n.Cartesian3.subtract(M,r,w),m=n.Cartesian3.dot(i,w),u=Math.min(m,u),l=Math.max(m,l),n.Cartesian3.add(C,h,M),n.Cartesian3.subtract(M,x,M),n.Cartesian3.subtract(M,f,M),n.Cartesian3.subtract(M,r,w),m=n.Cartesian3.dot(i,w),u=Math.min(m,u),l=Math.max(m,l),n.Cartesian3.subtract(C,h,M),n.Cartesian3.add(M,x,M),n.Cartesian3.add(M,f,M),n.Cartesian3.subtract(M,r,w),m=n.Cartesian3.dot(i,w),u=Math.min(m,u),l=Math.max(m,l),n.Cartesian3.subtract(C,h,M),n.Cartesian3.add(M,x,M),n.Cartesian3.subtract(M,f,M),n.Cartesian3.subtract(M,r,w),m=n.Cartesian3.dot(i,w),u=Math.min(m,u),l=Math.max(m,l),n.Cartesian3.subtract(C,h,M),n.Cartesian3.subtract(M,x,M),n.Cartesian3.add(M,f,M),n.Cartesian3.subtract(M,r,w),m=n.Cartesian3.dot(i,w),u=Math.min(m,u),l=Math.max(m,l),n.Cartesian3.subtract(C,h,M),n.Cartesian3.subtract(M,x,M),n.Cartesian3.subtract(M,f,M),n.Cartesian3.subtract(M,r,w),m=n.Cartesian3.dot(i,w),u=Math.min(m,u),l=Math.max(m,l),d.start=u,d.stop=l,d};var S=new s.BoundingSphere;C.isOccluded=function(e,r){if(!a.defined(e))throw new t.DeveloperError("box is required.");if(!a.defined(r))throw new t.DeveloperError("occluder is required.");var n=s.BoundingSphere.fromOrientedBoundingBox(e,S);return!r.isBoundingSphereVisible(n)},C.prototype.intersectPlane=function(e){return C.intersectPlane(this,e)},C.prototype.distanceSquaredTo=function(e){return C.distanceSquaredTo(this,e)},C.prototype.computePlaneDistances=function(e,a,t){return C.computePlaneDistances(this,e,a,t)},C.prototype.isOccluded=function(e){return C.isOccluded(this,e)},C.equals=function(e,t){return e===t||a.defined(e)&&a.defined(t)&&n.Cartesian3.equals(e.center,t.center)&&o.Matrix3.equals(e.halfAxes,t.halfAxes)},C.prototype.clone=function(e){return C.clone(this,e)},C.prototype.equals=function(e){return C.equals(this,e)},e.OrientedBoundingBox=C}));