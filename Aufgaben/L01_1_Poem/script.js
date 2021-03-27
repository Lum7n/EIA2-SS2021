"use strict";
var poem;
(function (poem) {
    // console.log("hello");
    let subjects = ["Sherlock Homes", "Dr. Watson", "Mrs. Hudson", "Detective Lestrade", "Moriarty"];
    let predicates = ["löst", "entdeckt", "kocht", "fällt in", "stellt"];
    let objects = ["einen Fall", "eine Leiche", "einen Tee", "eine Falle", "ein Rätsel"];
    // console.log(subjects, predicates, objects);
    for (let index = subjects.length; index > 0; index--) {
        // console.log("index = " + index);
        let verse = getVerse(subjects, predicates, objects);
        console.log(verse);
    }
    function getVerse(_subjects, _predicates, _objects) {
        let verse = "";
        let s = Math.random();
        s = s * _subjects.length;
        s = Math.floor(s);
        // console.log(s);
        let subject = _subjects.splice(s, 1); // !! splice liefert Array mit den ausgeschnittenen Elementen
        let p = Math.random();
        p = p * _predicates.length;
        p = Math.floor(p);
        // console.log(p);
        let predicate = _predicates.splice(p, 1);
        let o = Math.random();
        o = o * _objects.length;
        o = Math.floor(o);
        // console.log(o);
        let object = _objects.splice(o, 1);
        verse = verse + subject[0] + " " + predicate[0] + " " + object[0] + ["."];
        return verse;
    }
})(poem || (poem = {})); // namespace end
//# sourceMappingURL=script.js.map