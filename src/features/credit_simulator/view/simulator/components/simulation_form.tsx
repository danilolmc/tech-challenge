import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {moneyFormat} from "@/lib/utils.ts";
import {Slider} from "@/components/ui/slider.tsx";
import {
    MAX_LOAN_VALUE,
    MIN_LOAN_VALUE,
    Simulation
} from "@/features/credit_simulator/model/simulator/domain/simulation.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UseFormReturn} from "react-hook-form";
import InputMask from 'react-input-mask';

export  type SimulationFormProps = {
    form: UseFormReturn<Simulation>,
    onSubmit: (data: Simulation) => void
}
export const SimulationForm = ({form, onSubmit}: SimulationFormProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"flex-1 md:max-w-xs  lg:max-w-sm"}>
                <FormField
                    control={form.control}
                    name={"amount"}
                    render={({field}) => (
                        <FormItem className={"my-6"}>
                            <FormLabel className={"block"}>Valor do empréstimo</FormLabel>
                            <h1 className={"text-3xl font-semibold py-4"}>{moneyFormat(field.value)}</h1>
                            <FormControl>
                                <Slider
                                    value={[field.value]}
                                    min={MIN_LOAN_VALUE}
                                    max={MAX_LOAN_VALUE}
                                    step={1_000}
                                    onValueChange={(value) => field.onChange(value[0])}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"installments"}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={"block py-2"}>Quantidade de parcelas</FormLabel>
                            <FormControl>
                                <Input
                                    className={"h-10"}
                                    type={"number"}
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"client_birthdate"}
                    render={({field}) => (
                        <FormItem className={"my-6"}>
                            <FormLabel className={"block py-2"}>Data de nascimento</FormLabel>
                            <FormControl>
                                <InputMask
                                    className={"flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-10"}
                                    mask={"99/99/9999"}
                                    onChange={(e) => {
                                        const [day, month, year] = e.target.value.split("/");
                                        field.onChange(new Date(`${year}-${month}-${day}`))
                                    }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    className={"mt-8 w-full h-10"}
                    type={"submit"}
                >Simular</Button>
            </form>
        </Form>
    )
}