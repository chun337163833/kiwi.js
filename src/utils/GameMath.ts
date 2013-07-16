/**
 *  Kiwi - Utils - GameMath
 *
 *  @desc       Adds a set of extra Math functions and extends a few commonly used ones.
 *              Includes some methods written by Dylan Engelman.
 *
 *	@version 	1.0 - 17th March 2013
 *	@author 	Richard Davey
 *  @url        http://www.kiwijs.org
 */

module Kiwi.Utils {

    export class GameMath {

        public objType() {
            return "GameMath";
        }

        public static PI: number = 3.141592653589793; //number pi
        public static PI_2: number = 1.5707963267948965; //PI / 2 OR 90 deg
        public static PI_4: number = 0.7853981633974483; //PI / 4 OR 45 deg
        public static PI_8: number = 0.39269908169872413; //PI / 8 OR 22.5 deg
        public static PI_16: number = 0.19634954084936206; //PI / 16 OR 11.25 deg
        public static TWO_PI: number = 6.283185307179586; //2 * PI OR 180 deg
        public static THREE_PI_2: number = 4.7123889803846895; //3 * PI_2 OR 270 deg
        public static E: number = 2.71828182845905; //number e
        public static LN10: number = 2.302585092994046; //ln(10)
        public static LN2: number = 0.6931471805599453; //ln(2)
        public static LOG10E: number = 0.4342944819032518; //logB10(e)
        public static LOG2E: number = 1.442695040888963387; //logB2(e)
        public static SQRT1_2: number = 0.7071067811865476; //sqrt( 1 / 2 )
        public static SQRT2: number = 1.4142135623730951; //sqrt( 2 )
        public static DEG_TO_RAD: number = 0.017453292519943294444444444444444; //PI / 180;
        public static RAD_TO_DEG: number = 57.295779513082325225835265587527; // 180.0 / PI;

        public static B_16: number = 65536;//2^16
        public static B_31: number = 2147483648;//2^31
        public static B_32: number = 4294967296;//2^32
        public static B_48: number = 281474976710656;//2^48
        public static B_53: number = 9007199254740992;//2^53 !!NOTE!! largest accurate double floating point whole value
        public static B_64: number = 18446744073709551616;//2^64 !!NOTE!! Not accurate see B_53

        public static ONE_THIRD: number = 0.333333333333333333333333333333333; // 1.0/3.0;
        public static TWO_THIRDS: number = 0.666666666666666666666666666666666; // 2.0/3.0;
        public static ONE_SIXTH: number = 0.166666666666666666666666666666666; // 1.0/6.0;

        public static COS_PI_3: number = 0.86602540378443864676372317075294;//COS( PI / 3 )
        public static SIN_2PI_3: number = 0.03654595;// SIN( 2*PI/3 )

        public static CIRCLE_ALPHA: number = 0.5522847498307933984022516322796; //4*(Math.sqrt(2)-1)/3.0;

        public static ON: bool = true;
        public static OFF: bool = false;

        public static SHORT_EPSILON: number = 0.1;//round integer epsilon
        public static PERC_EPSILON: number = 0.001;//percentage epsilon
        public static EPSILON: number = 0.0001;//single float average epsilon
        public static LONG_EPSILON: number = 0.00000001;//arbitrary 8 digit epsilon

        public static computeMachineEpsilon(): number {
            // Machine epsilon ala Eispack
            var fourThirds: number = 4.0 / 3.0;
            var third: number = fourThirds - 1.0;
            var one: number = third + third + third;
            return Math.abs(1.0 - one);
        }

        public static fuzzyEqual(a: number, b: number, epsilon: number = 0.0001): bool {
            return Math.abs(a - b) < epsilon;
        }

        public static fuzzyLessThan(a: number, b: number, epsilon: number = 0.0001): bool {
            return a < b + epsilon;
        }

        public static fuzzyGreaterThan(a: number, b: number, epsilon: number = 0.0001): bool {
            return a > b - epsilon;
        }

        public static fuzzyCeil(val: number, epsilon: number = 0.0001): number {
            return Math.ceil(val - epsilon);
        }

        public static fuzzyFloor(val: number, epsilon: number = 0.0001): number {
            return Math.floor(val + epsilon);
        }

        public static average(...args: any[]): number {
            var avg: number = 0;

            for (var i = 0; i < args.length; i++)
            {
                avg += args[i];
            }

            return avg / args.length;
        }

        public static slam(value: number, target: number, epsilon: number = 0.0001): number {
            return (Math.abs(value - target) < epsilon) ? target : value;
        }

        /**
		 * ratio of value to a range
		 */
        public static percentageMinMax(val: number, max: number, min: number = 0): number {
            val -= min;
            max -= min;

            if (!max) return 0;
            else return val / max;
        }

        /**
		 * a value representing the sign of the value.
		 * -1 for negative, +1 for positive, 0 if value is 0
		 */
        public static sign(n: number): number {
            if (n) return n / Math.abs(n);
            else return 0;
        }

        public static truncate(n: number): number {
            return (n > 0) ? Math.floor(n) : Math.ceil(n);
        }

        public static shear(n: number): number {
            return n % 1;
        }

        /**
		 * wrap a value around a range, similar to modulus with a floating minimum
		 */
        public static wrap(val: number, max: number, min: number = 0): number {
            val -= min;
            max -= min;
            if (max == 0) return min;
            val %= max;
            val += min;
            while (val < min)
                val += max;

            return val;
        }

        /**
		 * arithmetic version of wrap... need to decide which is more efficient
		 */
        public static arithWrap(value: number, max: number, min: number = 0): number {
            max -= min;
            if (max == 0) return min;
            return value - max * Math.floor((value - min) / max);
        }

        /**
		 * force a value within the boundaries of two values
		 * 
		 * if max < min, min is returned
		 */
        public static clamp(input: number, max: number, min: number = 0): number {
            return Math.max(min, Math.min(max, input));
        }

        /**
		 * Snap a value to nearest grid slice, using rounding.
		 * 
		 * example if you have an interval gap of 5 and a position of 12... you will snap to 10. Where as 14 will snap to 15
		 * 
		 * @param input - the value to snap
		 * @param gap - the interval gap of the grid
		 * @param start - optional starting offset for gap
		 */
        public static snapTo(input: number, gap: number, start: number = 0): number {
            if (gap == 0) return input;

            input -= start;
            input = gap * Math.round(input / gap);
            return start + input;
        }

        /**
		 * Snap a value to nearest grid slice, using floor.
		 * 
		 * example if you have an interval gap of 5 and a position of 12... you will snap to 10. As will 14 snap to 10... but 16 will snap to 15
		 * 
		 * @param input - the value to snap
		 * @param gap - the interval gap of the grid
		 * @param start - optional starting offset for gap
		 */
        public static snapToFloor(input: number, gap: number, start: number = 0): number {
            if (gap == 0) return input;

            input -= start;
            input = gap * Math.floor(input / gap);
            return start + input;
        }

        /**
		 * Snap a value to nearest grid slice, using ceil.
		 * 
		 * example if you have an interval gap of 5 and a position of 12... you will snap to 15. As will 14 will snap to 15... but 16 will snap to 20
		 * 
		 * @param input - the value to snap
		 * @param gap - the interval gap of the grid
		 * @param start - optional starting offset for gap
		 */
        public static snapToCeil(input: number, gap: number, start: number = 0): number {
            if (gap == 0) return input;

            input -= start;
            input = gap * Math.ceil(input / gap);
            return start + input;
        }

        /**
		 * Snaps a value to the nearest value in an array.
		 */
        public static snapToInArray(input: number, arr: number[], sort: bool = true): number {

            if (sort) arr.sort();
            if (input < arr[0]) return arr[0];

            var i: number = 1;

            while (arr[i] < input)
                i++;

            var low: number = arr[i - 1];
            var high: number = (i < arr.length) ? arr[i] : Number.POSITIVE_INFINITY;

            return ((high - input) <= (input - low)) ? high : low;
        }

        /**
		 * roundTo some place comparative to a 'base', default is 10 for decimal place
		 * 
		 * 'place' is represented by the power applied to 'base' to get that place
		 * 
		 * @param value - the value to round
		 * @param place - the place to round to
		 * @param base - the base to round in... default is 10 for decimal
		 * 
		 * e.g.
		 * 
		 * 2000/7 ~= 285.714285714285714285714 ~= (bin)100011101.1011011011011011
		 * 
		 * roundTo(2000/7,3) == 0
		 * roundTo(2000/7,2) == 300
		 * roundTo(2000/7,1) == 290
		 * roundTo(2000/7,0) == 286
		 * roundTo(2000/7,-1) == 285.7
		 * roundTo(2000/7,-2) == 285.71
		 * roundTo(2000/7,-3) == 285.714
		 * roundTo(2000/7,-4) == 285.7143
		 * roundTo(2000/7,-5) == 285.71429
		 * 
		 * roundTo(2000/7,3,2)  == 288       -- 100100000
		 * roundTo(2000/7,2,2)  == 284       -- 100011100
		 * roundTo(2000/7,1,2)  == 286       -- 100011110
		 * roundTo(2000/7,0,2)  == 286       -- 100011110
		 * roundTo(2000/7,-1,2) == 285.5     -- 100011101.1
		 * roundTo(2000/7,-2,2) == 285.75    -- 100011101.11
		 * roundTo(2000/7,-3,2) == 285.75    -- 100011101.11
		 * roundTo(2000/7,-4,2) == 285.6875  -- 100011101.1011
		 * roundTo(2000/7,-5,2) == 285.71875 -- 100011101.10111
		 * 
		 * note what occurs when we round to the 3rd space (8ths place), 100100000, this is to be assumed 
		 * because we are rounding 100011.1011011011011011 which rounds up.
		 */
        public static roundTo(value: number, place: number = 0, base: number = 10): number {
            var p: number = Math.pow(base, -place);
            return Math.round(value * p) / p;
        }

        public static floorTo(value: number, place: number = 0, base: number = 10): number {
            var p: number = Math.pow(base, -place);
            return Math.floor(value * p) / p;
        }

        public static ceilTo(value: number, place: number = 0, base: number = 10): number {
            var p: number = Math.pow(base, -place);
            return Math.ceil(value * p) / p;
        }

        /**
		 * a one dimensional linear interpolation of a value.
		 */
        public static interpolateFloat(a: number, b: number, weight: number): number {
            return (b - a) * weight + a;
        }

        /**
		 * convert radians to degrees
		 */
        public static radiansToDegrees(angle: number): number {
            return angle * GameMath.RAD_TO_DEG;
        }

        /**
		 * convert degrees to radians
		 */
        public static degreesToRadians(angle: number): number {
            return angle * GameMath.DEG_TO_RAD;
        }

        /**
		 * Find the angle of a segment from (x1, y1) -> (x2, y2 )
		 */
        public static angleBetween(x1: number, y1: number, x2: number, y2: number): number {
            return Math.atan2(y2 - y1, x2 - x1);
        }


        /**
		 * set an angle with in the bounds of -PI to PI
		 */
        public static normalizeAngle(angle: number, radians: bool = true): number {
            var rd: number = (radians) ? GameMath.PI : 180;
            return GameMath.wrap(angle, rd, -rd);
        }

        /**
		 * closest angle between two angles from a1 to a2
		 * absolute value the return for exact angle
		 */
        public static nearestAngleBetween(a1: number, a2: number, radians: bool = true): number {

            var rd: number = (radians) ? GameMath.PI : 180;

            a1 = GameMath.normalizeAngle(a1, radians);
            a2 = GameMath.normalizeAngle(a2, radians);

            if (a1 < -rd / 2 && a2 > rd / 2) a1 += rd * 2;
            if (a2 < -rd / 2 && a1 > rd / 2) a2 += rd * 2;

            return a2 - a1;
        }

        /**
		 * normalizes independent and then sets dep to the nearest value respective to independent
		 * 
		 * for instance if dep=-170 and ind=170 then 190 will be returned as an alternative to -170
		 */
        public static normalizeAngleToAnother(dep: number, ind: number, radians: bool = true): number {
            return ind + Kiwi.Utils.GameMath.nearestAngleBetween(ind, dep, radians);
        }

        /**
		 * normalize independent and dependent and then set dependent to an angle relative to 'after/clockwise' independent
		 * 
		 * for instance dep=-170 and ind=170, then 190 will be reutrned as alternative to -170
		 */
        public static normalizeAngleAfterAnother(dep: number, ind: number, radians: bool = true): number {

            dep = Kiwi.Utils.GameMath.normalizeAngle(dep - ind, radians);
            return ind + dep;
        }

        /**
		 * normalizes indendent and dependent and then sets dependent to an angle relative to 'before/counterclockwise' independent
		 * 
		 * for instance dep = 190 and ind = 170, then -170 will be returned as an alternative to 190
		 */
        public static normalizeAngleBeforeAnother(dep: number, ind: number, radians: bool = true): number {

            dep = Kiwi.Utils.GameMath.normalizeAngle(ind - dep, radians);
            return ind - dep;
        }

        /**
		 * interpolate across the shortest arc between two angles
		 */
        public static interpolateAngles(a1: number, a2: number, weight: number, radians: bool = true, ease = null): number {

            a1 = Kiwi.Utils.GameMath.normalizeAngle(a1, radians);
            a2 = Kiwi.Utils.GameMath.normalizeAngleToAnother(a2, a1, radians);

            return (typeof ease === 'function') ? ease(weight, a1, a2 - a1, 1) : Kiwi.Utils.GameMath.interpolateFloat(a1, a2, weight);
        }

        /**
		 * Compute the logarithm of any value of any base
		 * 
		 * a logarithm is the exponent that some constant (base) would have to be raised to 
		 * to be equal to value.
		 * 
		 * i.e.
		 * 4 ^ x = 16
		 * can be rewritten as to solve for x
		 * logB4(16) = x
		 * which with this function would be 
		 * LoDMath.logBaseOf(16,4)
		 * 
		 * which would return 2, because 4^2 = 16
		 */
        public static logBaseOf(value: number, base: number): number {
            return Math.log(value) / Math.log(base);
        }

        /**
		 * Greatest Common Denominator using Euclid's algorithm
		 */
        public static GCD(m: number, n: number): number {
            var r: number;

            //make sure positive, GCD is always positive
            m = Math.abs(m);
            n = Math.abs(n);

            //m must be >= n
            if (m < n)
            {
                r = m;
                m = n;
                n = r;
            }

            //now start loop
            while (true)
            {
                r = m % n;
                if (!r) return n;
                m = n;
                n = r;
            }

            return 1;
        }

        /**
		 * Lowest Common Multiple
		 */
        public static LCM(m: number, n: number): number {
            return (m * n) / Kiwi.Utils.GameMath.GCD(m, n);
        }

        /**
		 * Factorial - N!
		 * 
		 * simple product series
		 * 
		 * by definition:
		 * 0! == 1
		 */
        public static factorial(value: number): number {
            if (value == 0) return 1;

            var res: number = value;

            while (--value)
            {
                res *= value;
            }

            return res;
        }

        /**
		 * gamma function
		 * 
		 * defined: gamma(N) == (N - 1)!
		 */
        public static gammaFunction(value: number): number {
            return Kiwi.Utils.GameMath.factorial(value - 1);
        }

        /**
		 * falling factorial
		 * 
		 * defined: (N)! / (N - x)!
		 * 
		 * written subscript: (N)x OR (base)exp
		 */
        public static fallingFactorial(base: number, exp: number): number {
            return Kiwi.Utils.GameMath.factorial(base) / Kiwi.Utils.GameMath.factorial(base - exp);
        }

        /**
		 * rising factorial
		 * 
		 * defined: (N + x - 1)! / (N - 1)!
		 * 
		 * written superscript N^(x) OR base^(exp)
		 */
        public static risingFactorial(base: number, exp: number): number {
            //expanded from gammaFunction for speed
            return Kiwi.Utils.GameMath.factorial(base + exp - 1) / Kiwi.Utils.GameMath.factorial(base - 1);
        }

        /**
		 * binomial coefficient
		 * 
		 * defined: N! / (k!(N-k)!)
		 * reduced: N! / (N-k)! == (N)k (fallingfactorial)
		 * reduced: (N)k / k!
		 */
        public static binCoef(n: number, k: number): number {
            return Kiwi.Utils.GameMath.fallingFactorial(n, k) / Kiwi.Utils.GameMath.factorial(k);
        }

        /**
		 * rising binomial coefficient
		 * 
		 * as one can notice in the analysis of binCoef(...) that 
		 * binCoef is the (N)k divided by k!. Similarly rising binCoef 
		 * is merely N^(k) / k! 
		 */
        public static risingBinCoef(n: number, k: number): number {
            return Kiwi.Utils.GameMath.risingFactorial(n, k) / Kiwi.Utils.GameMath.factorial(k);
        }

        /**
		 * Generate a random boolean result based on the chance value
		 * <p>
		 * Returns true or false based on the chance value (default 50%). For example if you wanted a player to have a 30% chance
		 * of getting a bonus, call chanceRoll(30) - true means the chance passed, false means it failed.
		 * </p>
		 * @param chance The chance of receiving the value. A number between 0 and 100 (effectively 0% to 100%)
		 * @return true if the roll passed, or false
		 */
        public static chanceRoll(chance: number = 50): bool {

            if (chance <= 0)
            {
                return false;
            }
            else if (chance >= 100)
            {
                return true;
            }
            else
            {
                if (Math.random() * 100 >= chance)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }

        }

        /**
		 * Adds the given amount to the value, but never lets the value go over the specified maximum
		 * 
		 * @param value The value to add the amount to
		 * @param amount The amount to add to the value
		 * @param max The maximum the value is allowed to be
		 * @return The new value
		 */
        public static maxAdd(value: number, amount: number, max: number): number {

            value += amount;

            if (value > max)
            {
                value = max;
            }

            return value;

        }

        /**
		 * Subtracts the given amount from the value, but never lets the value go below the specified minimum
		 * 
		 * @param value The base value
		 * @param amount The amount to subtract from the base value
		 * @param min The minimum the value is allowed to be
		 * @return The new value
		 */
        public static minSub(value: number, amount: number, min: number): number {

            value -= amount;

            if (value < min)
            {
                value = min;
            }

            return value;
        }

        /**
		 * Adds value to amount and ensures that the result always stays between 0 and max, by wrapping the value around.
		 * <p>Values must be positive integers, and are passed through Math.abs</p>
		 * 
		 * @param value The value to add the amount to
		 * @param amount The amount to add to the value
		 * @param max The maximum the value is allowed to be
		 * @return The wrapped value
		 */
        public static wrapValue(value: number, amount: number, max: number): number {

            var diff: number;

            value = Math.abs(value);
            amount = Math.abs(amount);
            max = Math.abs(max);

            diff = (value + amount) % max;

            return diff;

        }

        /**
		 * Randomly returns either a 1 or -1
		 * 
		 * @return	1 or -1
		 */
        public static randomSign(): number {
            return (Math.random() > 0.5) ? 1 : -1;
        }

        /**
		 * Returns true if the number given is odd.
		 * 
		 * @param	n	The number to check
		 * 
		 * @return	True if the given number is odd. False if the given number is even.
		 */
        public static isOdd(n: number): bool {

            if (n & 1)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /**
		 * Returns true if the number given is even.
		 * 
		 * @param	n	The number to check
		 * 
		 * @return	True if the given number is even. False if the given number is odd.
		 */
        public static isEven(n: number): bool {

            if (n & 1)
            {
                return false;
            }
            else
            {
                return true;
            }

        }

        /**
		 * Keeps an angle value between -180 and +180<br>
		 * Should be called whenever the angle is updated on the Sprite to stop it from going insane.
		 * 
		 * @param	angle	The angle value to check
		 * 
		 * @return	The new angle value, returns the same as the input angle if it was within bounds
		 */
        public static wrapAngle(angle: number): number {

            var result: number = angle;

            //  Nothing needs to change
            if (angle >= -180 && angle <= 180)
            {
                return angle;
            }

            //  Else normalise it to -180, 180
            result = (angle + 180) % 360;

            if (result < 0)
            {
                result += 360;
            }

            return result - 180;

        }

        /**
		 * Keeps an angle value between the given min and max values
		 * 
		 * @param	angle	The angle value to check. Must be between -180 and +180
		 * @param	min		The minimum angle that is allowed (must be -180 or greater)
		 * @param	max		The maximum angle that is allowed (must be 180 or less)
		 * 
		 * @return	The new angle value, returns the same as the input angle if it was within bounds
		 */
        public static angleLimit(angle: number, min: number, max: number): number {

            var result: number = angle;

            if (angle > max)
            {
                result = max;
            }
            else if (angle < min)
            {
                result = min;
            }

            return result;
        }

        /**
        * @method linear
        * @param {Any} v
        * @param {Any} k
        * @static
        */
        public static linearInterpolation(v, k) {

            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);

            if (k < 0) return Kiwi.Utils.GameMath.linear(v[0], v[1], f);
            if (k > 1) return Kiwi.Utils.GameMath.linear(v[m], v[m - 1], m - f);

            return Kiwi.Utils.GameMath.linear(v[i], v[i + 1 > m ? m : i + 1], f - i);

        }

        /**
        * @method Bezier
        * @param {Any} v
        * @param {Any} k
        * @static
        */
        public static bezierInterpolation(v, k) {

            var b = 0;
            var n = v.length - 1;

            for (var i = 0; i <= n; i++)
            {
                b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * Kiwi.Utils.GameMath.bernstein(n, i);
            }

            return b;

        }

        /**
        * @method CatmullRom
        * @param {Any} v
        * @param {Any} k
        * @static
        */
        public static catmullRomInterpolation(v, k) {

            var m = v.length - 1;
            var f = m * k;
            var i = Math.floor(f);

            if (v[0] === v[m])
            {
                if (k < 0) i = Math.floor(f = m * (1 + k));

                return Kiwi.Utils.GameMath.catmullRom(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

            }
            else
            {
                if (k < 0) return v[0] - (Kiwi.Utils.GameMath.catmullRom(v[0], v[0], v[1], v[1], -f) - v[0]);

                if (k > 1) return v[m] - (Kiwi.Utils.GameMath.catmullRom(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);

                return Kiwi.Utils.GameMath.catmullRom(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
            }

        }

        /**
        * @method Linear
        * @param {Any} p0
        * @param {Any} p1
        * @param {Any} t
        * @static
        */
        public static linear(p0, p1, t) {

            return (p1 - p0) * t + p0;

        }

        /**
        * @method Bernstein
        * @param {Any} n
        * @param {Any} i
        * @static
        */
        public static bernstein(n, i) {

            return Kiwi.Utils.GameMath.factorial(n) / Kiwi.Utils.GameMath.factorial(i) / Kiwi.Utils.GameMath.factorial(n - i);

        }

        /**
        * @method CatmullRom
        * @param {Any} p0
        * @param {Any} p1
        * @param {Any} p2
        * @param {Any} p3
        * @param {Any} t
        * @static
        */
        public static catmullRom(p0, p1, p2, p3, t) {

            var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

        }

        public static difference(a: number, b: number): number {

            return Math.abs(a - b);

        }

    }

}