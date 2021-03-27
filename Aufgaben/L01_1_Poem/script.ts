namespace poem {

    // console.log("hello");

    let subjects: string[] = ["Sherlock Homes", "Dr. Watson", "Mrs. Hudson", "Detective Lestrade", "Moriarty"];
    let predicates: string[] = ["löst", "entdeckt", "kocht", "fällt in", "stellt"];
    let objects: string[] = ["einen Fall", "eine Leiche", "einen Tee", "eine Falle", "ein Rätsel"];

    // console.log(subjects, predicates, objects);

    for (let index: number = subjects.length; index > 0; index--) {
        // console.log("index = " + index);

        let verse: string = getVerse(subjects, predicates, objects);
        console.log(verse);
    }

    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]): string {
        let verse: string = "";

        let s: number = Math.random();
        s = s * _subjects.length;
        s = Math.floor(s);
        // console.log(s);
        let subject: string[] = _subjects.splice(s, 1); // !! splice liefert Array mit den ausgeschnittenen Elementen

        let p: number = Math.random();
        p = p * _predicates.length;
        p = Math.floor(p);
        // console.log(p);
        let predicate: string[] = _predicates.splice(p, 1);

        let o: number = Math.random();
        o = o * _objects.length;
        o = Math.floor(o);
        // console.log(o);
        let object: string[] = _objects.splice(o, 1);

        verse = verse + subject[0] + " " + predicate[0] + " " + object[0] + ["."];
        return verse;
    }

} // namespace end