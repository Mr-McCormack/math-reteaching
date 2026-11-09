/* Advanced Algebra — matrices */
(function () {
  const { skill, T } = RB;
  const r = String.raw, MT = 'Adv. Algebra: matrices';
  const M = (rows) => r`\begin{bmatrix} ` + rows.map((x) => x.join(' & ')).join(r` \\ `) + r` \end{bmatrix}`;
  const m22 = (a, b, c, d) => M([[a, b], [c, d]]);
  const P = (v, lo, hi) => { const o = {}; v.split(' ').forEach((n) => { o[n] = lo + '..' + hi; }); return o; };
  const NZ = '-9..9 !0';

  skill('mat-add', 'Adding and subtracting matrices', MT);
  const S4 = 'a b c d e f g h';
  T('mat-add', 'worked', 'Add: $ ' + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' + ' + m22('{{e}}', '{{f}}', '{{g}}', '{{h}}') + ' $', m22('{{a+e}}', '{{b+f}}', '{{c+g}}', '{{d+h}}'), { params: P(S4, -9, 9), constraints: ['e != 0', 'f != 0', 'g != 0', 'h != 0'],
    steps: ['Add the entries in the same positions.', r`Top left: $ {{a}} + {{e:paren}} = {{a+e}} $, top right: $ {{b}} + {{f:paren}} = {{b+f}} $, bottom left: $ {{c}} + {{g:paren}} = {{c+g}} $, bottom right: $ {{d}} + {{h:paren}} = {{d+h}} $`] });
  T('mat-add', 'easier', 'Add: $ ' + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' + ' + m22('{{e}}', '{{f}}', '{{g}}', '{{h}}') + ' $', m22('{{a+e}}', '{{b+f}}', '{{c+g}}', '{{d+h}}'), { params: P(S4, 0, 6) });
  T('mat-add', 'parallel', 'Subtract: $ ' + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' - ' + m22('{{e}}', '{{f}}', '{{g}}', '{{h}}') + ' $', m22('{{a-e}}', '{{b-f}}', '{{c-g}}', '{{d-h}}'), { params: P(S4, -9, 9) });
  T('mat-add', 'parallel', 'Add: $ ' + M([['{{a}}', '{{b}}', '{{c}}'], ['{{d}}', '{{e}}', '{{f}}']]) + ' + ' + M([['{{g}}', '{{h}}', '{{i}}'], ['{{j}}', '{{k}}', '{{l}}']]) + ' $', M([['{{a+g}}', '{{b+h}}', '{{c+i}}'], ['{{d+j}}', '{{e+k}}', '{{f+l}}']]), { params: P('a b c d e f g h i j k l', -9, 9) });
  T('mat-add', 'parallel', r`Find $ x $ and $ y $ if $ ` + m22('x', '{{a}}', '{{b}}', 'y') + ' + ' + m22('{{c}}', '{{d}}', '{{e}}', '{{f}}') + ' = ' + m22('{{s}}', '{{a+d}}', '{{b+e}}', '{{t}}') + ' $', r`x = {{s-c}},\ y = {{t-f}}`, { params: { a: '-6..6', b: '-6..6', c: '-6..6', d: '-6..6', e: '-6..6', f: '-6..6', s: '-9..9', t: '-9..9' } });
  T('mat-add', 'challenge', 'Subtract: $ ' + M([['{{a}}', '{{b}}', '{{c}}'], ['{{d}}', '{{e}}', '{{f}}'], ['{{g}}', '{{h}}', '{{i}}']]) + ' - ' + M([['{{j}}', '{{k}}', '{{l}}'], ['{{m}}', '{{n}}', '{{o}}'], ['{{p}}', '{{q}}', '{{s}}']]) + ' $', M([['{{a-j}}', '{{b-k}}', '{{c-l}}'], ['{{d-m}}', '{{e-n}}', '{{f-o}}'], ['{{g-p}}', '{{h-q}}', '{{i-s}}']]), { params: P('a b c d e f g h i j k l m n o p q s', -6, 6) });

  skill('mat-scalar', 'Scalar multiplication of matrices', MT);
  T('mat-scalar', 'worked', r`Multiply: $ {{k}}` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $', m22('{{k*a}}', '{{k*b}}', '{{k*c}}', '{{k*d}}'), { params: Object.assign({ k: '2..5' }, P('a b c d', -6, 6)), steps: ['Multiply every entry of the matrix by the scalar.'] });
  T('mat-scalar', 'easier', r`Multiply: $ {{k}}` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $', m22('{{k*a}}', '{{k*b}}', '{{k*c}}', '{{k*d}}'), { params: Object.assign({ k: '2..4' }, P('a b c d', 1, 5)) });
  T('mat-scalar', 'parallel', r`Multiply: $ {{k}}` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $', m22('{{k*a}}', '{{k*b}}', '{{k*c}}', '{{k*d}}'), { params: Object.assign({ k: '-5..-2' }, P('a b c d', -6, 6)) });
  T('mat-scalar', 'parallel', r`Multiply: $ {{k}}` + M([['{{a}}', '{{b}}', '{{c}}'], ['{{d}}', '{{e}}', '{{f}}']]) + ' $', M([['{{k*a}}', '{{k*b}}', '{{k*c}}'], ['{{k*d}}', '{{k*e}}', '{{k*f}}']]), { params: Object.assign({ k: '2..5' }, P('a b c d e f', -5, 5)) });
  T('mat-scalar', 'challenge', r`Simplify: $ {{k}}` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' + {{j}}' + m22('{{e}}', '{{f}}', '{{g}}', '{{h}}') + ' $', m22('{{k*a+j*e}}', '{{k*b+j*f}}', '{{k*c+j*g}}', '{{k*d+j*h}}'), { params: Object.assign({ k: '2..4', j: '2..4' }, P('a b c d e f g h', -5, 5)) });
  T('mat-scalar', 'challenge', r`Simplify: $ {{k}}` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' - {{j}}' + m22('{{e}}', '{{f}}', '{{g}}', '{{h}}') + ' $', m22('{{k*a-j*e}}', '{{k*b-j*f}}', '{{k*c-j*g}}', '{{k*d-j*h}}'), { params: Object.assign({ k: '2..4', j: '2..4' }, P('a b c d e f g h', -5, 5)) });

  skill('mat-mult', 'Multiplying matrices', MT);
  const prod22 = ['{{a*e+b*g}}', '{{a*f+b*h}}', '{{c*e+d*g}}', '{{c*f+d*h}}'];
  const pr = (lo, hi) => P(S4, lo, hi);
  T('mat-mult', 'worked', 'Multiply: $ ' + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + m22('{{e}}', '{{f}}', '{{g}}', '{{h}}') + ' $', m22(...prod22), { params: pr(-4, 4),
    steps: ['Each entry is (row of the first matrix) · (column of the second matrix).', r`Top left: $ ({{a}})({{e}}) + ({{b}})({{g}}) = {{a*e+b*g}} $`, r`Top right: $ ({{a}})({{f}}) + ({{b}})({{h}}) = {{a*f+b*h}} $`, r`Bottom left: $ ({{c}})({{e}}) + ({{d}})({{g}}) = {{c*e+d*g}} $`, r`Bottom right: $ ({{c}})({{f}}) + ({{d}})({{h}}) = {{c*f+d*h}} $`] });
  T('mat-mult', 'easier', 'Multiply: $ ' + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + M([['{{e}}'], ['{{g}}']]) + ' $', M([['{{a*e+b*g}}'], ['{{c*e+d*g}}']]), { params: pr(-3, 5) });
  T('mat-mult', 'parallel', 'Multiply: $ ' + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + m22('{{e}}', '{{f}}', '{{g}}', '{{h}}') + ' $', m22(...prod22), { params: pr(-5, 5) });
  T('mat-mult', 'parallel', 'Multiply: $ ' + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + M([['{{e}}'], ['{{g}}']]) + ' $', M([['{{a*e+b*g}}'], ['{{c*e+d*g}}']]), { params: pr(-6, 6) });
  T('mat-mult', 'parallel', 'Multiply: $ ' + M([['{{a}}', '{{b}}']]) + M([['{{e}}', '{{f}}'], ['{{g}}', '{{h}}']]) + ' $', M([['{{a*e+b*g}}', '{{a*f+b*h}}']]), { params: pr(-5, 5) });
  T('mat-mult', 'challenge', 'Multiply: $ ' + M([['{{a}}', '{{b}}', '{{c}}'], ['{{d}}', '{{e}}', '{{f}}']]) + M([['{{g}}', '{{h}}'], ['{{i}}', '{{j}}'], ['{{k}}', '{{l}}']]) + ' $', m22('{{a*g+b*i+c*k}}', '{{a*h+b*j+c*l}}', '{{d*g+e*i+f*k}}', '{{d*h+e*j+f*l}}'), { params: P('a b c d e f g h i j k l', -3, 4) });
  T('mat-mult', 'challenge', r`Do $ AB $ and $ BA $ give the same matrix? Compute $ AB $ for $ A = ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + r`,\ B = ` + m22('{{e}}', '{{f}}', '{{g}}', '{{h}}') + ' $.', m22(...prod22), { params: pr(-3, 3) });

  skill('mat-det', 'Determinants', MT);
  const det2 = (lo, hi, extra) => Object.assign(P('a b c d', lo, hi), extra || {});
  T('mat-det', 'worked', r`Find the determinant of $ ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $.', r`{{a*d-b*c}}`, { params: det2(-6, 6), constraints: ['a*d-b*c != 0'],
    steps: [r`For $ \begin{bmatrix} a & b \\ c & d \end{bmatrix} $ the determinant is $ ad - bc $.`, r`$ ({{a}})({{d}}) - ({{b}})({{c}}) = {{a*d}} - ({{b*c}}) = {{a*d-b*c}} $`] });
  T('mat-det', 'easier', r`Find the determinant of $ ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $.', r`{{a*d-b*c}}`, { params: det2(1, 6), constraints: ['a*d-b*c != 0'] });
  T('mat-det', 'parallel', r`Find the determinant of $ ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $.', r`{{a*d-b*c}}`, { params: det2(-9, 9) });
  T('mat-det', 'parallel', r`Is the matrix $ ` + m22('{{a}}', '{{b}}', '{{k*a}}', '{{k*b}}') + r` $ invertible? Answer yes or no.`, r`\text{no (determinant is } 0\text{)}`, { params: { a: '1..5', b: '1..5', k: '2..4' } });
  T('mat-det', 'parallel', r`Find $ x $ so that the determinant of $ ` + m22('{{a}}', '{{b}}', '{{c}}', 'x') + r` $ is $ {{dt}} $.`, r`x = {{(dt+b*c)/a}}`, { params: { a: '2..5', b: '-5..5 !0', c: '-5..5 !0', dt: '-8..8 !0' }, constraints: ['mod(dt+b*c,a) == 0'] });
  T('mat-det', 'challenge', r`Find the determinant of $ ` + M([['{{a}}', '{{b}}', '{{c}}'], ['{{d}}', '{{e}}', '{{f}}'], ['{{g}}', '{{h}}', '{{i}}']]) + ' $.', r`{{a*(e*i-f*h)-b*(d*i-f*g)+c*(d*h-e*g)}}`, { params: P('a b c d e f g h i', -3, 4) });

  skill('mat-inv', 'Inverse of a 2×2 matrix', MT);
  const inv = { params: { a: '1..4', b: '-3..3 !0', c: '-3..3 !0' }, derived: { d: '(1+b*c)/a' }, constraints: ['isint(d)', 'abs(d) <= 9', 'd != 0'] };
  const invA = m22('{{d}}', '{{-b}}', '{{-c}}', '{{a}}');
  T('mat-inv', 'worked', r`Find the inverse of $ A = ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $.', invA, Object.assign({ steps: [r`The determinant is $ ad - bc = ({{a}})({{d}}) - ({{b}})({{c}}) = 1 $.`, r`For $ \begin{bmatrix} a & b \\ c & d \end{bmatrix} $ the inverse is $ \frac{1}{ad-bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix} $.`, r`Since the determinant is 1, $ A^{-1} = ` + invA.replace(/\\/g, '\\') + ' $.'] }, inv));
  T('mat-inv', 'easier', r`Find the inverse of $ ` + m22('{{a}}', '1', '{{c}}', '{{d}}') + ' $.', m22('{{d}}', '-1', '{{-c}}', '{{a}}'), { params: { a: '1..3', d: '1..3' }, derived: { c: 'a*d-1' }, constraints: ['c != 0'] });
  T('mat-inv', 'parallel', r`Find the inverse of $ ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $.', invA, inv);
  T('mat-inv', 'parallel', r`Find the inverse of $ ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + ' $.', r`\frac{1}{ {{dt}} }` + m22('{{d}}', '{{-b}}', '{{-c}}', '{{a}}'), { params: { a: '1..5', b: '-4..4 !0', c: '-4..4 !0', d: '1..5' }, derived: { dt: 'a*d-b*c' }, constraints: ['dt > 1', 'dt <= 12'] });
  T('mat-inv', 'parallel', r`Show that $ B = ` + m22('{{d}}', '{{-b}}', '{{-c}}', '{{a}}') + r` $ is the inverse of $ A = ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + r` $ by finding $ AB $.`, r`AB = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}`, inv);
  T('mat-inv', 'challenge', r`Solve for $ X $: $ ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + r`X = ` + M([['{{e}}'], ['{{f}}']]) + ' $.', M([['{{d*e-b*f}}'], ['{{-c*e+a*f}}']]), Object.assign({}, inv, { params: Object.assign({}, inv.params, { e: '-9..9', f: '-9..9' }) }));

  skill('mat-solve', 'Solving systems with matrices', MT);
  const sys = { params: { a: '1..4', b: '-3..3 !0', c: '-3..3 !0', x0: '-6..6 !0', y0: '-6..6 !0' }, derived: { d: '(1+b*c)/a', e: 'a*x0+b*y0', f: 'c*x0+d*y0' }, constraints: ['isint(d)', 'abs(d) <= 9', 'd != 0', 'abs(e) <= 40', 'abs(f) <= 40'] };
  const sysP = (extra) => Object.assign({}, sys, extra || {});
  T('mat-solve', 'worked', r`Write the system as a matrix equation $ AX = B $ and solve it using $ A^{-1} $:` + NLs() + r`$ {{a:coef}}x{{b:sgncoef}}y = {{e}} $` + NLs() + r`$ {{c:coef}}x{{d:sgncoef}}y = {{f}} $`, r`x = {{x0}},\ y = {{y0}}`, sysP({ steps: [r`$ A = ` + m22('{{a}}', '{{b}}', '{{c}}', '{{d}}') + r`,\ X = ` + M([['x'], ['y']]) + r`,\ B = ` + M([['{{e}}'], ['{{f}}']]) + ' $', r`$ \det A = 1 $, so $ A^{-1} = ` + m22('{{d}}', '{{-b}}', '{{-c}}', '{{a}}') + ' $', r`$ X = A^{-1}B = ` + M([['{{x0}}'], ['{{y0}}']]) + ' $'] }));
  T('mat-solve', 'easier', r`Write the system as an augmented matrix:` + NLs() + r`$ {{a:coef}}x{{b:sgncoef}}y = {{e}} $` + NLs() + r`$ {{c:coef}}x{{d:sgncoef}}y = {{f}} $`, r`\left[\begin{array}{cc|c} {{a}} & {{b}} & {{e}} \\ {{c}} & {{d}} & {{f}} \end{array}\right]`, { params: { a: '-5..5 !0', b: '-5..5 !0', c: '-5..5 !0', d: '-5..5 !0', e: '-9..9', f: '-9..9' } });
  T('mat-solve', 'parallel', r`Solve the system using the inverse of the coefficient matrix:` + NLs() + r`$ {{a:coef}}x{{b:sgncoef}}y = {{e}} $` + NLs() + r`$ {{c:coef}}x{{d:sgncoef}}y = {{f}} $`, r`x = {{x0}},\ y = {{y0}}`, sysP());
  T('mat-solve', 'parallel', r`Write the system as an augmented matrix:` + NLs() + r`$ {{a:coef}}x{{b:sgncoef}}y = {{e}} $` + NLs() + r`$ {{c:coef}}x{{d:sgncoef}}y = {{f}} $`, r`\left[\begin{array}{cc|c} {{a}} & {{b}} & {{e}} \\ {{c}} & {{d}} & {{f}} \end{array}\right]`, { params: { a: '-6..6 !0', b: '-6..6 !0', c: '-6..6 !0', d: '-6..6 !0', e: '-12..12', f: '-12..12' } });
  T('mat-solve', 'challenge', r`Solve the system using matrices:` + NLs() + r`$ {{a:coef}}x{{b:sgncoef}}y = {{e}} $` + NLs() + r`$ {{c:coef}}x{{d:sgncoef}}y = {{f}} $`, r`x = {{x0}},\ y = {{y0}}`, sysP({ params: { a: '1..5', b: '-4..4 !0', c: '-4..4 !0', x0: '-9..9 !0', y0: '-9..9 !0' }, constraints: ['isint(d)', 'abs(d) <= 9', 'd != 0', 'abs(e) <= 60', 'abs(f) <= 60'] }));
  function NLs() { return '\n'; }
})();
