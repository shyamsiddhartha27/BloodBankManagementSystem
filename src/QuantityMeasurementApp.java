public class QuantityMeasurementApp {

    public enum LengthUnit {
        FEET(12.0),
        INCHES(1.0),
        YARDS(36.0),
        CENTIMETERS(0.393701);

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
            if (unit == null) {
                throw new IllegalArgumentException("Unit cannot be null");
            }
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
                case "yard":
                case "yards":
                    return LengthUnit.YARDS;
                case "cm":
                case "centimeter":
                case "centimeters":
                    return LengthUnit.CENTIMETERS;
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
            // Using a small epsilon to handle floating point precision issues for conversions
            return Math.abs(this.getBaseValue() - that.getBaseValue()) < 0.00001;
        }

        @Override
        public String toString() {
            return "Quantity(" + value + ", " + unit.name() + ")";
        }
    }

    public static void main(String[] args) {
        System.out.println("Running UC4 Test Cases...");

        runTest("testEquality_YardToYard_SameValue", () -> {
            return new QuantityLength(1.0, LengthUnit.YARDS).equals(new QuantityLength(1.0, LengthUnit.YARDS));
        });

        runTest("testEquality_YardToYard_DifferentValue", () -> {
            return !new QuantityLength(1.0, LengthUnit.YARDS).equals(new QuantityLength(2.0, LengthUnit.YARDS));
        });

        runTest("testEquality_YardToFeet_EquivalentValue", () -> {
            return new QuantityLength(1.0, LengthUnit.YARDS).equals(new QuantityLength(3.0, LengthUnit.FEET));
        });

        runTest("testEquality_FeetToYard_EquivalentValue", () -> {
            return new QuantityLength(3.0, LengthUnit.FEET).equals(new QuantityLength(1.0, LengthUnit.YARDS));
        });

        runTest("testEquality_YardToInches_EquivalentValue", () -> {
            return new QuantityLength(1.0, LengthUnit.YARDS).equals(new QuantityLength(36.0, LengthUnit.INCHES));
        });

        runTest("testEquality_InchesToYard_EquivalentValue", () -> {
            return new QuantityLength(36.0, LengthUnit.INCHES).equals(new QuantityLength(1.0, LengthUnit.YARDS));
        });

        runTest("testEquality_YardToFeet_NonEquivalentValue", () -> {
            return !new QuantityLength(1.0, LengthUnit.YARDS).equals(new QuantityLength(2.0, LengthUnit.FEET));
        });

        runTest("testEquality_centimetersToInches_EquivalentValue", () -> {
            return new QuantityLength(1.0, LengthUnit.CENTIMETERS).equals(new QuantityLength(0.393701, LengthUnit.INCHES));
        });

        runTest("testEquality_centimetersToFeet_NonEquivalentValue", () -> {
            return !new QuantityLength(1.0, LengthUnit.CENTIMETERS).equals(new QuantityLength(1.0, LengthUnit.FEET));
        });

        runTest("testEquality_MultiUnit_TransitiveProperty", () -> {
            QuantityLength a = new QuantityLength(1.0, LengthUnit.YARDS);
            QuantityLength b = new QuantityLength(3.0, LengthUnit.FEET);
            QuantityLength c = new QuantityLength(36.0, LengthUnit.INCHES);
            return a.equals(b) && b.equals(c) && a.equals(c);
        });

        runTest("testEquality_YardWithNullUnit", () -> {
            try {
                new QuantityLength(1.0, (LengthUnit) null);
                return false;
            } catch (IllegalArgumentException e) {
                return true;
            }
        });

        runTest("testEquality_YardSameReference", () -> {
            QuantityLength yard = new QuantityLength(1.0, LengthUnit.YARDS);
            return yard.equals(yard);
        });

        runTest("testEquality_YardNullComparison", () -> {
            QuantityLength yard = new QuantityLength(1.0, LengthUnit.YARDS);
            return !yard.equals(null);
        });

        runTest("testEquality_CentimetersWithNullUnit", () -> {
            try {
                new QuantityLength(1.0, (LengthUnit) null);
                return false;
            } catch (IllegalArgumentException e) {
                return true;
            }
        });

        runTest("testEquality_CentimetersSameReference", () -> {
            QuantityLength cm = new QuantityLength(1.0, LengthUnit.CENTIMETERS);
            return cm.equals(cm);
        });

        runTest("testEquality_CentimetersNullComparison", () -> {
            QuantityLength cm = new QuantityLength(1.0, LengthUnit.CENTIMETERS);
            return !cm.equals(null);
        });

        runTest("testEquality_AllUnits_ComplexScenario", () -> {
            QuantityLength y = new QuantityLength(2.0, LengthUnit.YARDS);
            QuantityLength f = new QuantityLength(6.0, LengthUnit.FEET);
            QuantityLength i = new QuantityLength(72.0, LengthUnit.INCHES);
            return y.equals(f) && f.equals(i) && y.equals(i);
        });

        System.out.println("\nExample Output of running the App");
        System.out.println("Input: Quantity(1.0, YARDS) and Quantity(3.0, FEET)");
        System.out.println("Output: Equal (" + new QuantityLength(1.0, LengthUnit.YARDS).equals(new QuantityLength(3.0, LengthUnit.FEET)) + ")");
        System.out.println("Input: Quantity(1.0, YARDS) and Quantity(36.0, INCHES)");
        System.out.println("Output: Equal (" + new QuantityLength(1.0, LengthUnit.YARDS).equals(new QuantityLength(36.0, LengthUnit.INCHES)) + ")");
        System.out.println("Input: Quantity(2.0, YARDS) and Quantity(2.0, YARDS)");
        System.out.println("Output: Equal (" + new QuantityLength(2.0, LengthUnit.YARDS).equals(new QuantityLength(2.0, LengthUnit.YARDS)) + ")");
        System.out.println("Input: Quantity(2.0, CENTIMETERS) and Quantity(2.0, CENTIMETERS)");
        System.out.println("Output: Equal (" + new QuantityLength(2.0, LengthUnit.CENTIMETERS).equals(new QuantityLength(2.0, LengthUnit.CENTIMETERS)) + ")");
        System.out.println("Input: Quantity(1.0, CENTIMETERS) and Quantity(0.393701, INCHES)");
        System.out.println("Output: Equal (" + new QuantityLength(1.0, LengthUnit.CENTIMETERS).equals(new QuantityLength(0.393701, LengthUnit.INCHES)) + ")");
    }

    private static void runTest(String testName, java.util.function.Supplier<Boolean> test) {
        try {
            boolean result = test.get();
            System.out.println(testName + ": " + result);
        } catch (Exception e) {
            System.out.println(testName + ": false (Exception: " + e.getMessage() + ")");
        }
    }
}
