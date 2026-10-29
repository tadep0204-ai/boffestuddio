program QuizFutbol;

uses crt;

var
  opcion: char;
  puntos: integer;

procedure Pausa;
begin
  writeln;
  textcolor(darkgray);
  write('Apreta ENTER para seguir...');
  readln;
end;

procedure Titulo;
begin
  clrscr;
  textcolor(lightgreen);
  writeln('     _...----..._');
  writeln('   ,''    |    ''.');
  writeln('  /  \   |   /  \');
  writeln(' |----O--+--O----|');
  writeln('  \  /   |   \  /');
  writeln('   ''.    |    .''');
  writeln('     ''--...--''');
  writeln;
  textcolor(yellow);
  writeln('  ==============================');
  writeln('         QUIZ DE FUTBOL');
  writeln('  ==============================');
  writeln;
end;

{ lee la respuesta hasta que ponga a, b o c }
function LeerRespuesta: char;
var
  r: char;
begin
  repeat
    textcolor(white);
    write('Respuesta: ');
    readln(r);
    r := upcase(r);
    if not (r in ['A', 'B', 'C']) then
    begin
      textcolor(lightred);
      writeln('Tenes que poner a, b o c');
    end;
  until r in ['A', 'B', 'C'];
  LeerRespuesta := r;
end;

procedure Preguntar(num: integer; preg, a, b, c: string; correcta: char; var puntos: integer);
var
  resp: char;
  textoCorrecto: string;
begin
  textcolor(white);
  writeln(num, ') ', preg);
  textcolor(lightcyan);
  writeln('   a) ', a);
  writeln('   b) ', b);
  writeln('   c) ', c);

  resp := LeerRespuesta;

  case correcta of
    'A': textoCorrecto := a;
    'B': textoCorrecto := b;
    'C': textoCorrecto := c;
  end;

  if resp = correcta then
  begin
    textcolor(lightgreen);
    writeln('Correcto!');
    puntos := puntos + 1;
  end
  else
  begin
    textcolor(lightred);
    writeln('Incorrecto, era ', textoCorrecto);
  end;
  writeln;
end;

procedure Resultado(puntos: integer);
begin
  textcolor(yellow);
  writeln('------------------------------');
  writeln('  Puntaje: ', puntos, ' de 3');
  writeln('------------------------------');
  case puntos of
    3: begin textcolor(lightgreen); writeln('  Excelente, las sacaste todas!'); end;
    2: begin textcolor(lightcyan);  writeln('  Muy bien!'); end;
    1: begin textcolor(brown);      writeln('  Mas o menos...'); end;
    0: begin textcolor(lightred);   writeln('  No sacaste ninguna :('); end;
  end;
  Pausa;
end;

begin
  repeat
    Titulo;
    textcolor(white);
    writeln('  1 - Copa Libertadores');
    writeln('  2 - Liga Argentina');
    writeln('  3 - Mundiales');
    writeln('  4 - Salir');
    writeln;
    write('  Elegi una opcion: ');
    readln(opcion);

    puntos := 0;

    case opcion of
      '1': begin
             Titulo;
             textcolor(lightmagenta);
             writeln('COPA LIBERTADORES');
             writeln;
             Preguntar(1, 'Que club gano mas Copas Libertadores?',
                       'Boca', 'Independiente', 'Penarol', 'B', puntos);
             Preguntar(2, 'Quien gano la final 2018 que se jugo en Madrid?',
                       'River', 'Boca', 'Gremio', 'A', puntos);
             Preguntar(3, 'Que equipo gano la Libertadores 2023?',
                       'Palmeiras', 'Flamengo', 'Fluminense', 'C', puntos);
             Resultado(puntos);
           end;

      '2': begin
             Titulo;
             textcolor(lightblue);
             writeln('LIGA ARGENTINA');
             writeln;
             Preguntar(1, 'Que club tiene mas titulos de liga en Argentina?',
                       'Boca', 'River', 'Racing', 'B', puntos);
             Preguntar(2, 'Quienes juegan el clasico de Avellaneda?',
                       'Racing e Independiente', 'Lanus y Banfield', 'Boca y River', 'A', puntos);
             Preguntar(3, 'A que equipo le dicen "El Ciclon"?',
                       'Huracan', 'Velez', 'San Lorenzo', 'C', puntos);
             Resultado(puntos);
           end;

      '3': begin
             Titulo;
             textcolor(lightcyan);
             writeln('MUNDIALES');
             writeln;
             Preguntar(1, 'Cuantos mundiales gano Argentina?',
                       '2', '3', '4', 'B', puntos);
             Preguntar(2, 'Donde se jugo el Mundial 2022?',
                       'Rusia', 'Brasil', 'Qatar', 'C', puntos);
             Preguntar(3, 'Que seleccion gano mas mundiales?',
                       'Brasil', 'Alemania', 'Italia', 'A', puntos);
             Resultado(puntos);
           end;

      '4': begin
             textcolor(yellow);
             writeln;
             writeln('  Gracias por jugar!');
           end;
    else
      begin
        textcolor(lightred);
        writeln('  Opcion incorrecta');
        Pausa;
      end;
    end;
  until opcion = '4';
  textcolor(lightgray);
end.
