public class QuantityMeasurementApp {

    public enum LengthUnit {
        FEET(12.0),
        INCHES(1.0);

        private final double conversionFactor;

        LengthUnit(double conversionFactor) {
            this.conversionFactor = conversionFactor;
        }

        public double getConversionFactor() {
            return conversionFactor;
        }
    }

    public static class QuantityLength {
        private final double value;
        private final LengthUnit unit;

        public QuantityLength(double value, String unitString) {
            this.value = value;
            this.unit = parseUnit(unitString);
        }

        public QuantityLength(double value, LengthUnit unit) {
            this.value = value;
            this.unit = unit;
        }

        private LengthUnit parseUnit(String unitString) {
            if (unitString == null) {
                throw new IllegalArgumentException("Unit cannot be null");
            }
            switch (unitString.toLowerCase()) {
                case "feet":
                case "foot":
                    return LengthUnit.FEET;
                case "inch":
                case "inches":
                    return LengthUnit.INCHES;
                default:
                    throw new IllegalArgumentException("Unsupported unit: " + unitString);
            }
        }

        public double getBaseValue() {
            return this.value * this.unit.getConversionFactor();
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            QuantityLength that = (QuantityLength) obj;
            return Double.compare(this.getBaseValue(), that.getBaseValue()) == 0;
        }

        @Override
        public String toString() {
            return "Quantity(" + value + ", \"" + unit.name().toLowerCase() + "\")";
        }
    }

    public static void main(String[] args) {
        System.out.println("Running UC3 Test Cases...");

        // testEquality_FeetToFeet_SameValue
        try {
            QuantityLength feet1 = new QuantityLength(1.0, "feet");
            QuantityLength feet2 = new QuantityLength(1.0, "feet");
            System.out.println("testEquality_FeetToFeet_SameValue: " + feet1.equals(feet2));
        } catch (Exception e) {
            System.out.println("testEquality_FeetToFeet_SameValue: " + e.getMessage());
        }

        // testEquality_InchToInch_SameValue
        try {
            QuantityLength inch1 = new QuantityLength(1.0, "inch");
            QuantityLength inch2 = new QuantityLength(1.0, "inch");
            System.out.println("testEquality_InchToInch_SameValue: " + inch1.equals(inch2));
        } catch (Exception e) {
            System.out.println("testEquality_InchToInch_SameValue: " + e.getMessage());
        }

        // testEquality_InchToFeet_EquivalentValue
        try {
            QuantityLength inch12 = new QuantityLength(12.0, "inch");
            QuantityLength feet1 = new QuantityLength(1.0, "feet");
            System.out.println("testEquality_InchToFeet_EquivalentValue: " + inch12.equals(feet1));
        } catch (Exception e) {
            System.out.println("testEquality_InchToFeet_EquivalentValue: " + e.getMessage());
        }

        // testEquality_FeetToFeet_DifferentValue
        try {
            QuantityLength feet1 = new QuantityLength(1.0, "feet");
            QuantityLength feet2 = new QuantityLength(2.0, "feet");
            System.out.println("testEquality_FeetToFeet_DifferentValue: " + (!feet1.equals(feet2)));
        } catch (Exception e) {
            System.out.println("testEquality_FeetToFeet_DifferentValue: " + e.getMessage());
        }

        // testEquality_InchToInch_DifferentValue
        try {
            QuantityLength inch1 = new QuantityLength(1.0, "inch");
            QuantityLength inch2 = new QuantityLength(2.0, "inch");
            System.out.println("testEquality_InchToInch_DifferentValue: " + (!inch1.equals(inch2)));
        } catch (Exception e) {
            System.out.println("testEquality_InchToInch_DifferentValue: " + e.getMessage());
        }

        // testEquality_InvalidUnit
        try {
            new QuantityLength(1.0, "meters");
            System.out.println("testEquality_InvalidUnit: false (should have thrown exception)");
        } catch (IllegalArgumentException e) {
            System.out.println("testEquality_InvalidUnit: true (Exception caught - " + e.getMessage() + ")");
        }

        // testEquality_NullUnit
        try {
            new QuantityLength(1.0, (String) null);
            System.out.println("testEquality_NullUnit: false (should have thrown exception)");
        } catch (IllegalArgumentException e) {
            System.out.println("testEquality_NullUnit: true (Exception caught - " + e.getMessage() + ")");
        }

        // testEquality_SameReference
        try {
            QuantityLength feet1 = new QuantityLength(1.0, "feet");
            System.out.println("testEquality_SameReference: " + feet1.equals(feet1));
        } catch (Exception e) {
            System.out.println("testEquality_SameReference: " + e.getMessage());
        }

        // testEquality_NullComparison
        try {
            QuantityLength feet1 = new QuantityLength(1.0, "feet");
            System.out.println("testEquality_NullComparison: " + (!feet1.equals(null)));
        } catch (Exception e) {
            System.out.println("testEquality_NullComparison: " + e.getMessage());
        }
        
        System.out.println("\nExample Output of running the App:");
        System.out.println("Input: Quantity(1.0, \"feet\") and Quantity(12.0, \"inches\")");
        System.out.println("Output: Equal (" + new QuantityLength(1.0, "feet").equals(new QuantityLength(12.0, "inches")) + ")");
        System.out.println("Input: Quantity(1.0, \"inch\") and Quantity(1.0, \"inch\")");
        System.out.println("Output: Equal (" + new QuantityLength(1.0, "inch").equals(new QuantityLength(1.0, "inch")) + ")");
    }
}
