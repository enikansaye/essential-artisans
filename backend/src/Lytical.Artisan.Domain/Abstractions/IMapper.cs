namespace Lytical.Artisan.Domain.Abstractions
{
    public interface IMapper
    {
        /// <summary>
        /// Execute a mapping from the source object to a new destination object. The source
        ///     type is inferred from the source object.
        /// </summary>
        /// <typeparam name="TDestination">Destination type to create</typeparam>
        /// <param name="source">Source object to map from</param>
        /// <returns>Mapped destination object</returns>
        TDestination Map<TDestination>(object source);

        /// <summary>
        /// Execute a mapping from the source object to a new destination object.
        /// </summary>
        /// <typeparam name="TSource">Source type to use, regardless of the runtime type</typeparam>
        /// <typeparam name="TDestination">Destination type to create</typeparam>
        /// <param name="source">Source object to map from</param>
        /// <returns>Mapped destination object</returns>
        TDestination Map<TSource, TDestination>(TSource source);

        //
        // Summary:
        //     Execute a mapping from the source object to the existing destination object.
        //
        // Parameters:
        //   source:
        //     Source object to map from
        //
        //   destination:
        //     Destination object to map into
        //
        // Type parameters:
        //   TSource:
        //     Source type to use
        //
        //   TDestination:
        //     Destination type
        //
        // Returns:
        //     The mapped destination object, same instance as the destination object
        TDestination Map<TSource, TDestination>(TSource source, TDestination destination);


        //
        // Summary:
        //     Execute a mapping from the source object to a new destination object with explicit
        //     System.Type objects
        //
        // Parameters:
        //   source:
        //     Source object to map from
        //
        //   sourceType:
        //     Source type to use
        //
        //   destinationType:
        //     Destination type to create
        //
        // Returns:
        //     Mapped destination object
        object Map(object source, Type sourceType, Type destinationType);

    }
}
