public class QuantityMeasurementApp {

    public static class Feet {
        private final double value;

        public Feet(double value) {
            this.value = value;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Feet feet = (Feet) obj;
            return Double.compare(feet.value, value) == 0;
        }
    }

    public static class Inches {
        private final double value;

        public Inches(double value) {
            this.value = value;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Inches inches = (Inches) obj;
            return Double.compare(inches.value, value) == 0;
        }
    }

    public static boolean compareFeet(double v1, double v2) {
        Feet f1 = new Feet(v1);
        Feet f2 = new Feet(v2);
        return f1.equals(f2);
    }

    public static boolean compareInches(double v1, double v2) {
        Inches i1 = new Inches(v1);
        Inches i2 = new Inches(v2);
        return i1.equals(i2);
    }

    public static void main(String[] args) {
        System.out.println("Running UC2: Feet and Inches measurement equality tests...\n");

        // Feet Tests
        System.out.println("--- Feet Tests ---");
        System.out.println("testEquality_SameValue (1.0 ft and 1.0 ft): " + compareFeet(1.0, 1.0) + " (Expected: true)");
        System.out.println("testEquality_DifferentValue (1.0 ft and 2.0 ft): " + compareFeet(1.0, 2.0) + " (Expected: false)");
        
        Feet f1 = new Feet(1.0);
        System.out.println("testEquality_NullComparison (1.0 ft and null): " + f1.equals(null) + " (Expected: false)");
        System.out.println("testEquality_SameReference (f1 and f1): " + f1.equals(f1) + " (Expected: true)");

        // Inches Tests
        System.out.println("\n--- Inches Tests ---");
        System.out.println("testEquality_SameValue (1.0 in and 1.0 in): " + compareInches(1.0, 1.0) + " (Expected: true)");
        System.out.println("testEquality_DifferentValue (1.0 in and 2.0 in): " + compareInches(1.0, 2.0) + " (Expected: false)");
        
        Inches i1 = new Inches(1.0);
        System.out.println("testEquality_NullComparison (1.0 in and null): " + i1.equals(null) + " (Expected: false)");
        System.out.println("testEquality_SameReference (i1 and i1): " + i1.equals(i1) + " (Expected: true)");
        
        // Type Safety Check
        System.out.println("\n--- Type Safety Check ---");
        System.out.println("testEquality_DifferentType (Feet and Inches): " + f1.equals(i1) + " (Expected: false)");
    }
}
