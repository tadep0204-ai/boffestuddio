program QuizFutbol;

uses crt;

var
  opcion: char;
  puntos: integer;

{ Espera a que el jugador apriete ENTER }
procedure Pausa;
begin
  writeln;
  textcolor(darkgray);
  write('Presiona ENTER para seguir...');
  readln;
end;

{ Limpia la pantalla y dibuja el titulo }
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
  writeln('       QUIZ  DE  FUTBOL');
  writeln('  ==============================');
  writeln;
end;

{ Muestra una pregunta, lee la respuesta y suma si es correcta }
procedure Preguntar(numero: integer; pregunta, opA, opB, opC: string;
                    correcta: char; explicacion: string; var puntos: integer);
var
  resp: char;
begin
  textcolor(white);
  writeln('Pregunta ', numero, ': ', pregunta);
  textcolor(lightcyan);
  writeln('   a) ', opA);
  writeln('   b) ', opB);
  writeln('   c) ', opC);

  { Pide la respuesta hasta que sea a, b o c }
  repeat
    textcolor(white);
    write('Tu respuesta: ');
    readln(resp);
    resp := upcase(resp);
    if not (resp in ['A', 'B', 'C']) then
    begin
      textcolor(lightred);
      writeln('Escribi a, b o c.');
    end;
  until resp in ['A', 'B', 'C'];

  if resp = correcta then
  begin
    textcolor(lightgreen);
    writeln('GOOOOL! Correcto!');
    puntos := puntos + 1;
  end
  else
  begin
    textcolor(lightred);
    writeln('Afuera! ', explicacion);
  end;
  writeln;
end;

{ Muestra el puntaje final con un mensaje segun el resultado }
procedure Resultado(puntos: integer);
begin
  textcolor(yellow);
  writeln('------------------------------');
  writeln('  Resultado: ', puntos, ' de 3');
  writeln('------------------------------');
  case puntos of
    3: begin textcolor(lightgreen); writeln('  Crack! Sos un enciclopedista del futbol.'); end;
    2: begin textcolor(lightcyan);  writeln('  Muy bien! Te falto poquito.'); end;
    1: begin textcolor(brown);      writeln('  Zafaste... hay que mirar mas futbol.'); end;
    0: begin textcolor(lightred);   writeln('  Uff, a la B! Anda a ver mas partidos.'); end;
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
    write('  Elegi una tematica: ');
    readln(opcion);

    puntos := 0;

    case opcion of
      '1': begin
             Titulo;
             textcolor(lightmagenta);
             writeln('--- COPA LIBERTADORES ---');
             writeln;
             Preguntar(1, 'Que club gano mas Copas Libertadores?',
                       'Boca', 'Independiente', 'Penarol',
                       'B', 'Era Independiente, con 7.', puntos);
             Preguntar(2, 'Quien gano la final 2018 jugada en Madrid?',
                       'River', 'Boca', 'Gremio',
                       'A', 'Era River.', puntos);
             Preguntar(3, 'Que equipo gano la Libertadores 2023?',
                       'Palmeiras', 'Flamengo', 'Fluminense',
                       'C', 'Era Fluminense.', puntos);
             Resultado(puntos);
           end;

      '2': begin
             Titulo;
             textcolor(lightblue);
             writeln('--- LIGA ARGENTINA ---');
             writeln;
             Preguntar(1, 'Que club tiene mas titulos de liga en Argentina?',
                       'Boca', 'River', 'Racing',
                       'B', 'Era River.', puntos);
             Preguntar(2, 'Quienes juegan el clasico de Avellaneda?',
                       'Racing e Independiente', 'Lanus y Banfield', 'Boca y River',
                       'A', 'Eran Racing e Independiente.', puntos);
             Preguntar(3, 'A que equipo le dicen "El Ciclon"?',
                       'Huracan', 'Velez', 'San Lorenzo',
                       'C', 'Era San Lorenzo.', puntos);
             Resultado(puntos);
           end;

      '3': begin
             Titulo;
             textcolor(lightcyan);
             writeln('--- MUNDIALES ---');
             writeln;
             Preguntar(1, 'Cuantos mundiales gano Argentina?',
                       '2', '3', '4',
                       'B', 'Son 3 (1978, 1986 y 2022).', puntos);
             Preguntar(2, 'Donde se jugo el Mundial 2022?',
                       'Rusia', 'Brasil', 'Qatar',
                       'C', 'Fue en Qatar.', puntos);
             Preguntar(3, 'Que seleccion gano mas mundiales?',
                       'Brasil', 'Alemania', 'Italia',
                       'A', 'Es Brasil, con 5.', puntos);
             Resultado(puntos);
           end;

      '4': begin
             textcolor(yellow);
             writeln;
             writeln('  Gracias por jugar! Chau!');
           end;
    else
      begin
        textcolor(lightred);
        writeln('  Opcion invalida. Elegi 1, 2, 3 o 4.');
        Pausa;
      end;
    end;
  until opcion = '4';
  textcolor(lightgray);
end.
